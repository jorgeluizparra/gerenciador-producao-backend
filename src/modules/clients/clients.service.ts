import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto, FindAllClientsQueryDto, UpdateClientDto } from './clients.dto';
import { ClientsEntity } from './clients.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);
  
  constructor(
    @InjectRepository(ClientsEntity)
    private clientsRepository: Repository<ClientsEntity>,
  ) {}

  async create (body: CreateClientDto): Promise<ClientsEntity> {
    if (!Number.isInteger(parseInt(body.cpf)) || body.cpf.length != 11) {
      this.logger.warn("Invalid CPF. It must contain 11 numbers.")
      throw new HttpException(
        { message: "CPF inválido. CPF deve conter 11 numeros." },
        HttpStatus.BAD_REQUEST
      )
    }
    let clients = await this.findAll([
      { email: body.email },
      { cpf: body.cpf }
    ])
    if (clients.length > 0) {
      this.logger.warn({
        location: '[Clients > create]',
        message: "Email or CPF already signed up"
      })
      throw new HttpException(
        { message: "Email ou CPF já cadastrados" },
        HttpStatus.BAD_REQUEST
      )
    }
    let client = this.clientsRepository.create(body)
    let salt = await bcrypt.genSalt()
    client.password = await bcrypt.hash(client.password, salt)
    return this.clientsRepository.save(client).catch((error) => {
      this.logger.error({
        location: '[Clients > create]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllClientsQueryDto|FindAllClientsQueryDto[]): Promise<ClientsEntity[]> {
    return this.clientsRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Clients > findAll]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<ClientsEntity> {
    let client = await this.clientsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Clients > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!client) {
      this.logger.warn("Client not found")
      throw new HttpException(
        { message: "Usuário não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return client;
  }

  async updateOne(id: number, body: UpdateClientDto): Promise<ClientsEntity> {
    await this.findOne(id, []);
    await this.clientsRepository.update({ id }, body).catch(error => {
      this.logger.error({
        location: '[Clients > updateOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    return this.findOne(id, []);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id, []);
    await this.clientsRepository.delete(id);
  }

}
