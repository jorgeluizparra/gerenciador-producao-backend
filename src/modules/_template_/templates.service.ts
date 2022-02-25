import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SintegraService } from '../sintegra/sintegra.service';
import { CreateTemplateDto, UpdateTemplateDto } from './templates.dto';
import { TemplatesEntity } from './templates.entity';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);
  
  constructor(
    @InjectRepository(TemplatesEntity)
    private templatesRepository: Repository<TemplatesEntity>,
  ) {}

  async create (body: CreateTemplateDto): Promise<TemplatesEntity> {
    let template = this.templatesRepository.create(body)
    return this.templatesRepository.save(template).catch((error) => {
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
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number): Promise<TemplatesEntity> {
    let template;
    try {
      template = await this.templatesRepository.findOne(id, { relations: ['productCategories'] });
    } catch (error) {
      this.logger.error({
        location: '[Templates > findOne]',
        error
      })
      throw new HttpException(
        { message: "" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    if (!template) {
      this.logger.warn("")
      throw new HttpException(
        { message: "" },
        HttpStatus.NOT_FOUND
      )
    }
    return template;
  }

  async updateOne(id: number, body: UpdateTemplateDto): Promise<TemplatesEntity> {
    await this.findOne(id);
    await this.templatesRepository.update({ id }, body);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.templatesRepository.delete(id);
  }

}
