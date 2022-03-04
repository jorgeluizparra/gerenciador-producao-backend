import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { CreateTemplateDto } from './template.dto';
import { TemplatesEntity } from './template.entity';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);
  
  constructor(
    @InjectRepository(TemplatesEntity)
    private templatesRepository: Repository<TemplatesEntity>,
    private companiesService: CompaniesService,
  ) {}

  async create (body: CreateTemplateDto): Promise<TemplatesEntity> {
    let productCategorie = this.templatesRepository.create(body);
    let company = await this.companiesService.findOne(body.companyId);
    productCategorie.company = company
    return this.templatesRepository.save(productCategorie).catch((error) => {
      this.logger.error({
        location: '[Templates > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query): Promise<TemplatesEntity[]> {
    return this.templatesRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Templates > findAll]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number): Promise<TemplatesEntity> {
    let template = await this.templatesRepository.findOne(id, { relations: ['products'] }).catch((error) => {
      this.logger.error({
        location: '[Templates > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!template) {
      this.logger.warn("Template id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return template;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.templatesRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Templates > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
