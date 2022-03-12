import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateTicketGroupDto, FindAllTicketGroupsQueryDto, UpdateTicketGroupDto } from './ticket.groups.dto';
import { TicketGroupsEntity } from './ticket.groups.entity';
import { TicketGroupsService } from './ticket.groups.service';

@ApiTags('Event Ticket Groups')
@Controller('events/ticket-groups')
export class TicketGroupsController {
  constructor(private readonly ticketGroupsService: TicketGroupsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Ticket Group created successfully',
      type: TicketGroupsEntity
  })
  @ApiBadRequestResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateTicketGroupDto): Promise<TicketGroupsEntity> {
    return this.ticketGroupsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all ticket groups that match with the query',
    type: [TicketGroupsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllTicketGroupsQueryDto): Promise<TicketGroupsEntity[]> {
    return this.ticketGroupsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the Ticket Group data',
    type: TicketGroupsEntity
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
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<TicketGroupsEntity> {
    return this.ticketGroupsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Opening date data updated.',
    type: TicketGroupsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateTicketGroupDto): Promise<TicketGroupsEntity> {
    return this.ticketGroupsService.updateOne(id, body)
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
    return this.ticketGroupsService.remove(id)
  }
}
