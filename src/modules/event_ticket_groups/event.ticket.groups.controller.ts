import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateEventTicketGroupDto, FindAllEventTicketGroupsQueryDto, UpdateEventTicketGroupDto } from './event.ticket.groups.dto';
import { EventTicketGroupsEntity } from './event.ticket.groups.entity';
import { EventTicketGroupsService } from './event.ticket.groups.service';

@ApiTags('Event Ticket Groups')
@Controller('events/ticket-groups')
export class EventTicketGroupsController {
  constructor(private readonly eventTicketGroupsService: EventTicketGroupsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Ticket Group created successfully',
      type: EventTicketGroupsEntity
  })
  @ApiBadRequestResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateEventTicketGroupDto): Promise<EventTicketGroupsEntity> {
    return this.eventTicketGroupsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all ticket groups that match with the query',
    type: [EventTicketGroupsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllEventTicketGroupsQueryDto): Promise<EventTicketGroupsEntity[]> {
    return this.eventTicketGroupsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the Ticket Group data',
    type: EventTicketGroupsEntity
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
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<EventTicketGroupsEntity> {
    return this.eventTicketGroupsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Opening date data updated.',
    type: EventTicketGroupsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateEventTicketGroupDto): Promise<EventTicketGroupsEntity> {
    return this.eventTicketGroupsService.updateOne(id, body)
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
    return this.eventTicketGroupsService.remove(id)
  }
}
