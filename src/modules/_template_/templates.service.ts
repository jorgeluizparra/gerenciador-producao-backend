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

  findAll(): Promise<TemplatesEntity[]> {
    return this.templatesRepository.find().catch((error) => {
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

  findOne(id: number): Promise<TemplatesEntity> {
    try {
      return this.templatesRepository.findOne(id);
    } catch (error) {
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
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
