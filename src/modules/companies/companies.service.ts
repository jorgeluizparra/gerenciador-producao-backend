import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SintegraService } from '../sintegra/sintegra.service';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { CompaniesEntity } from './companies.entity';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);
  
  constructor(
    @InjectRepository(CompaniesEntity)
    private companiesRepository: Repository<CompaniesEntity>,
    private sintegraService: SintegraService,
  ) {}

  private async getCompanyData (cnpj: string) {
    let CNPJ = process.env.NODE_ENV == 'development' ? process.env.SINTEGRA_CNPJ_FOR_TEST : cnpj;
    return this.sintegraService.findOneCnpj(CNPJ)
  }

  async create (body: CreateCompanyDto): Promise<CompaniesEntity> {
    if (!Number.isInteger(parseInt(body.cnpj)) || body.cnpj.length != 14) {
      this.logger.warn("Invalid CNPJ. It must contain 14 numbers.")
      throw new HttpException(
        { message: "CNPJ inválido. CNPJ deve conter 14 numeros." },
        HttpStatus.BAD_REQUEST
      )
    }
    let companies = await this.findAll({ cnpj: body.cnpj })
    if (companies.length > 0) {
      this.logger.warn("CNPJ already signed up")
      throw new HttpException(
        { message: "CNPJ já cadastrado" },
        HttpStatus.BAD_REQUEST
      )
    }
    let data = await this.getCompanyData(body.cnpj);
    let company = this.companiesRepository.create({
      name: body.name,
      cnpj: body.cnpj,
      phone: data.telefone,
      email: data.email,
      state: data.uf,
      city: data.municipio,
    })
    return this.companiesRepository.save(company).catch((error) => {
      this.logger.error({
        location: '[Companies > create]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: object): Promise<CompaniesEntity[]> {
    return this.companiesRepository.find({
      where: query
    }).catch((error) => {
      this.logger.error({
        location: '[Companies > findAll]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number): Promise<CompaniesEntity> {
    let company = await this.companiesRepository.findOne(id, { relations: ['productCategories', 'users'] }).catch((error) => {
      this.logger.error({
        location: '[Companies > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!company) {
      this.logger.warn("Company's id not found.")
      throw new HttpException(
        { message: "Empresa não encontrada" },
        HttpStatus.NOT_FOUND
      )
    }
    return company;
  }

  async updateOne(id: number, body: UpdateCompanyDto): Promise<CompaniesEntity> {
    await this.findOne(id);
    await this.companiesRepository.update({ id }, body);
    return this.findOne(id);
  }

  // async remove(id: string): Promise<void> {
  //   await this.companiesRepository.delete(id);
  // }

}
