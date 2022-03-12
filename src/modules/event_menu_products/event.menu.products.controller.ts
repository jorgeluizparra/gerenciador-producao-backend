import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateEventMenusProductDto, FindAllEventMenusProductsQueryDto, UpdateEventMenusProductDto } from './event.menu.products.dto';
import { EventMenusProductsEntity } from './event.menu.products.entity';
import { EventMenusProductsService } from './event.menu.products.service';

@ApiTags('Event Menu Products')
@Controller('events/menu-products')
export class EventMenusProductsController {
  constructor(private readonly eventMenusProductsService: EventMenusProductsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Menu Product created successfully',
      type: EventMenusProductsEntity
  })
  @ApiBadRequestResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateEventMenusProductDto): Promise<EventMenusProductsEntity> {
    return this.eventMenusProductsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all menus that match with the query',
    type: [EventMenusProductsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllEventMenusProductsQueryDto): Promise<EventMenusProductsEntity[]> {
    return this.eventMenusProductsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the Menu Product data',
    type: EventMenusProductsEntity
  })
  @ApiNotFoundResponse({
    description: 'Menu Product id not found',
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
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<EventMenusProductsEntity> {
    return this.eventMenusProductsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Opening date data updated.',
    type: EventMenusProductsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateEventMenusProductDto): Promise<EventMenusProductsEntity> {
    return this.eventMenusProductsService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: 'Menu Product deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Menu Product id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.eventMenusProductsService.remove(id)
  }
}
