import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { CreateUserDto, FindAllUsersQueryDto, UpdateUserDto } from './users.dto';
import { UsersEntity } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private companiesService: CompaniesService
    ) {}

  async create (body: CreateUserDto): Promise<UsersEntity> {
    let users = await this.findAll([
      { email: body.email }
    ])
    if (users.length > 0) {
      this.logger.warn({
        location: '[Users > create]',
        message: "Email already signed up"
      })
      throw new HttpException(
        { message: "Email já cadastrados" },
        HttpStatus.BAD_REQUEST
      )
    }
    let user = this.usersRepository.create(body)
    let salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt)
    user.company = await this.companiesService.findOne(body.companyId, ['users'])
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

  findAll(query: FindAllUsersQueryDto|FindAllUsersQueryDto[]): Promise<UsersEntity[]> {
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

  async findOne(id: number, relations: string[]): Promise<UsersEntity> {
    let user = await this.usersRepository.findOne(id, { relations }).catch((error) => {
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
    await this.findOne(id, []);
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
    return this.findOne(id, []);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id, []);
    await this.usersRepository.delete(id);
  }

}
