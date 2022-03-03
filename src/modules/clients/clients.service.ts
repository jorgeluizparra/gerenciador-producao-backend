import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from './clients.dto';
import { ClientsEntity } from './clients.entity';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);
  
  constructor(
    @InjectRepository(ClientsEntity)
    private clientsRepository: Repository<ClientsEntity>,
  ) {}

  async create (body: CreateClientDto): Promise<ClientsEntity> {
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

  findAll(query): Promise<ClientsEntity[]> {
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

  async findOne(id: number): Promise<ClientsEntity> {
    let client = await this.clientsRepository.findOne(id, { relations: ['creditCards'] }).catch((error) => {
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
      this.logger.warn("User not found")
      throw new HttpException(
        { message: "Usuário não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return client;
  }

  async updateOne(id: number, body: UpdateClientDto): Promise<ClientsEntity> {
    await this.findOne(id);
    await this.clientsRepository.update({ id }, body);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.clientsRepository.delete(id);
  }

}
