import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { CreateTicketGroupDto, FindAllTicketGroupsQueryDto, UpdateTicketGroupDto } from './ticket.groups.dto';
import { TicketGroupsEntity } from './ticket.groups.entity';

@Injectable()
export class TicketGroupsService {
  private readonly logger = new Logger(TicketGroupsService.name);
  
  constructor(
    @InjectRepository(TicketGroupsEntity)
    private ticketGroupsRepository: Repository<TicketGroupsEntity>,
    private eventService: EventsService,
  ) {}

  async create (body: CreateTicketGroupDto): Promise<TicketGroupsEntity> {
    let eventMenusProducts = await this.findAll({ eventId: body.eventId, name: body.name })
    if (eventMenusProducts.length > 0) {
      this.logger.warn("Ticket group already exist")
      throw new HttpException(
        { message: `Já existe um lote com este nome.` },
        HttpStatus.BAD_REQUEST
      )
    }
    let ticketGroup = this.ticketGroupsRepository.create(body);
    ticketGroup.event = await this.eventService.findOne(body.eventId, ['ticketGroups']);
    return this.ticketGroupsRepository.save(ticketGroup).catch((error) => {
      this.logger.error({
        location: '[TicketGroups > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllTicketGroupsQueryDto|FindAllTicketGroupsQueryDto[]): Promise<TicketGroupsEntity[]> {
    return this.ticketGroupsRepository.find({ where: query}).catch((error) => {
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

  async findOne(id: number, relations: string[]): Promise<TicketGroupsEntity> {
    let ticketGroup = await this.ticketGroupsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Ticket Groups > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!ticketGroup) {
      this.logger.warn("Ticket Group id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return ticketGroup;
  }

  async updateOne(id: number, body: UpdateTicketGroupDto): Promise<TicketGroupsEntity> {
    await this.findOne(id, []);
    await this.ticketGroupsRepository.update({ id }, body).catch(error => {
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
    await this.ticketGroupsRepository.delete(id).catch((error) => {
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
