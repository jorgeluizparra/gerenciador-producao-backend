import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateEventDto, UpdateEventDto } from './events.dto';
import { EventsEntity } from './events.entity';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Event created successfully',
    type: EventsEntity
  })
  @ApiBadRequestResponse({
    description: 'Event category id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateEventDto): Promise<EventsEntity> {
    return this.eventsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all event that match with the query',
    type: [EventsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  // @ApiQuery({ name: 'company', required: false })
  async findAll(@Query() query: object): Promise<EventsEntity[]> {
    return this.eventsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the event data',
    type: EventsEntity
  })
  @ApiNotFoundResponse({
    description: 'Event id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<EventsEntity> {
    return this.eventsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Company data updated.',
    type: EventsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateEventDto): Promise<EventsEntity> {
    return this.eventsService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: 'Event deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Event id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.eventsService.remove(id)
  }
}
