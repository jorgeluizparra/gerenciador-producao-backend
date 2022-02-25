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

  private async findByCnpj (cnpj: string): Promise<CompaniesEntity[]> {
    return this.companiesRepository.find({
      where: {
        cnpj
      }
    })
  }

  async create (body: CreateCompanyDto): Promise<CompaniesEntity> {
    if (!Number.isInteger(parseInt(body.cnpj)) || body.cnpj.length != 14) {
      this.logger.warn("Invalid CNPJ. It must contain 14 numbers.")
      throw new HttpException(
        { message: "CNPJ inválido. CNPJ deve conter 14 numeros." },
        HttpStatus.BAD_REQUEST
      )
    }
    let companies = await this.findByCnpj(body.cnpj)
    if (companies.length > 0) {
      this.logger.warn("CNPJ already signed up")
      throw new HttpException(
        { message: "CNPJ já cadastrado" },
        HttpStatus.CONFLICT
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
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(): Promise<CompaniesEntity[]> {
    return this.companiesRepository.find().catch((error) => {
      this.logger.error({
        location: '[Companies > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number): Promise<CompaniesEntity> {
    let company;
    try {
      company = await this.companiesRepository.findOne(id, { relations: ['productCategories'] });
    } catch (error) {
      this.logger.error({
        location: '[Companies > findOne]',
        error
      })
      throw new HttpException(
        { message: "Ocorreu um erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    if (!company) {
      this.logger.warn("Company's id not found.")
      throw new HttpException(
        { message: "Id da empresa não encontrado" },
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
