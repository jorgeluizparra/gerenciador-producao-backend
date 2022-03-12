import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketGroupsService } from '../event_ticket_groups/ticket.groups.service';
import { CreateTicketGroupDto, FindAllTicketsQueryDto, UpdateTicketGroupDto } from './tickets.dto';
import { TicketsEntity } from './tickets.entity';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);
  
  constructor(
    @InjectRepository(TicketsEntity)
    private ticketsRepository: Repository<TicketsEntity>,
    private ticketGroupsService: TicketGroupsService,
  ) {}

  async create (body: CreateTicketGroupDto): Promise<TicketsEntity> {
    let eventMenusProducts = await this.findAll({ groupId: body.groupId })
    if (eventMenusProducts.length > 0) {
      this.logger.warn("Ticket group already exist")
      throw new HttpException(
        { message: `Já existe um lote com este nome.` },
        HttpStatus.BAD_REQUEST
      )
    }
    let ticketGroup = this.ticketsRepository.create(body);
    ticketGroup.group = await this.ticketGroupsService.findOne(body.groupId, ['tickets']);
    return this.ticketsRepository.save(ticketGroup).catch((error) => {
      this.logger.error({
        location: '[Tickets > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllTicketsQueryDto|FindAllTicketsQueryDto[]): Promise<TicketsEntity[]> {
    return this.ticketsRepository.find({ where: query}).catch((error) => {
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

  async findOne(id: number, relations: string[]): Promise<TicketsEntity> {
    let ticketGroup = await this.ticketsRepository.findOne(id, { relations }).catch((error) => {
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

  async updateOne(id: number, body: UpdateTicketGroupDto): Promise<TicketsEntity> {
    await this.findOne(id, []);
    await this.ticketsRepository.update({ id }, body).catch(error => {
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
    await this.ticketsRepository.delete(id).catch((error) => {
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
