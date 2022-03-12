import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateTicketGroupDto, FindAllTicketsQueryDto, UpdateTicketGroupDto } from './tickets.dto';
import { TicketsEntity } from './tickets.entity';
import { TicketsService } from './tickets.service';

@ApiTags('Event Tickets')
@Controller('events/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Ticket Group created successfully',
      type: TicketsEntity
  })
  @ApiBadRequestResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateTicketGroupDto): Promise<TicketsEntity> {
    return this.ticketsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all ticket groups that match with the query',
    type: [TicketsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllTicketsQueryDto): Promise<TicketsEntity[]> {
    return this.ticketsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the Ticket Group data',
    type: TicketsEntity
  })
  @ApiNotFoundResponse({
    description: 'Ticket Group id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @ApiQuery({
    name: 'relations',
    required: false
  })
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<TicketsEntity> {
    return this.ticketsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Opening date data updated.',
    type: TicketsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateTicketGroupDto): Promise<TicketsEntity> {
    return this.ticketsService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: 'Ticket Group deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Ticket Group id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.ticketsService.remove(id)
  }
}
