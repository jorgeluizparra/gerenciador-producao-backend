import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private companiesService: CompaniesService
    ) {}

  async create (body: CreateUserDto): Promise<UsersEntity> {
    let user = this.usersRepository.create(body)
    let company = await this.companiesService.findOne(body.companyId)
    user.company = company
    return this.usersRepository.save(user).catch((error) => {
      this.logger.error({
        location: '[Users > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query): Promise<UsersEntity[]> {
    return this.usersRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Users > findAll]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number): Promise<UsersEntity> {
    let user = await this.usersRepository.findOne(id, { relations: [] }).catch((error) => {
      this.logger.error({
        location: '[Users > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!user) {
      this.logger.warn("User not found")
      throw new HttpException(
        { message: "Usuário não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return user;
  }

  async updateOne(id: number, body: UpdateUserDto): Promise<UsersEntity> {
    await this.findOne(id);
    await this.usersRepository.update({ id }, body).catch(error => {
      this.logger.error({
        location: '[Users > updateOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.delete(id);
  }

}
