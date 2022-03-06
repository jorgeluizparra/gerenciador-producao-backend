import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { SintegraService } from '../sintegra/sintegra.service';
import { CreateEventDto, UpdateEventDto } from './events.dto';
import { EventsEntity } from './events.entity';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  
  constructor(
    @InjectRepository(EventsEntity)
    private eventsRepository: Repository<EventsEntity>,
    private companiesService: CompaniesService,
  ) {}

  async create (body: CreateEventDto): Promise<EventsEntity> {
    let event = this.eventsRepository.create(body)
    event.company = await this.companiesService.findOne(body.companyId, ['events']);
    return this.eventsRepository.save(event).catch((error) => {
      this.logger.error({
        location: '[Events > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query): Promise<EventsEntity[]> {
    return this.eventsRepository.find({ where: query }).catch((error) => {
      this.logger.error({
        location: '[Events > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<EventsEntity> {
    let event = await this.eventsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Event > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!event) {
      this.logger.warn("Event id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return event;
  }

  async updateOne(id: number, body: UpdateEventDto): Promise<EventsEntity> {
    await this.findOne(id, []);
    await this.eventsRepository.update({ id }, body).catch((error) => {
      this.logger.error({
        location: '[Event > updateOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    return this.findOne(id, []);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id, [])
    await this.eventsRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Event > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
