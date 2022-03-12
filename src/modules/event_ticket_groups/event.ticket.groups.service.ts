import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { CreateEventTicketGroupDto, FindAllEventTicketGroupsQueryDto, UpdateEventTicketGroupDto } from './event.ticket.groups.dto';
import { EventTicketGroupsEntity } from './event.ticket.groups.entity';

@Injectable()
export class EventTicketGroupsService {
  private readonly logger = new Logger(EventTicketGroupsService.name);
  
  constructor(
    @InjectRepository(EventTicketGroupsEntity)
    private eventTicketGroupsRepository: Repository<EventTicketGroupsEntity>,
    private eventService: EventsService,
  ) {}

  async create (body: CreateEventTicketGroupDto): Promise<EventTicketGroupsEntity> {
    let eventMenusProducts = await this.findAll({ eventId: body.eventId, name: body.name })
    if (eventMenusProducts.length > 0) {
      this.logger.warn("Ticket group already exist")
      throw new HttpException(
        { message: `Já existe um lote com este nome.` },
        HttpStatus.BAD_REQUEST
      )
    }
    let eventTicketGroup = this.eventTicketGroupsRepository.create(body);
    eventTicketGroup.event = await this.eventService.findOne(body.eventId, ['eventTicketGroups']);
    return this.eventTicketGroupsRepository.save(eventTicketGroup).catch((error) => {
      this.logger.error({
        location: '[EventTicketGroups > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllEventTicketGroupsQueryDto|FindAllEventTicketGroupsQueryDto[]): Promise<EventTicketGroupsEntity[]> {
    return this.eventTicketGroupsRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Ticket Groups > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<EventTicketGroupsEntity> {
    let eventTicketGroup = await this.eventTicketGroupsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Ticket Groups > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!eventTicketGroup) {
      this.logger.warn("Ticket Group id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return eventTicketGroup;
  }

  async updateOne(id: number, body: UpdateEventTicketGroupDto): Promise<EventTicketGroupsEntity> {
    await this.findOne(id, []);
    await this.eventTicketGroupsRepository.update({ id }, body).catch(error => {
      this.logger.error({
        location: '[Ticket Groups > updateOne]',
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
    await this.findOne(id, [])
    await this.eventTicketGroupsRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Ticket Groups > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
