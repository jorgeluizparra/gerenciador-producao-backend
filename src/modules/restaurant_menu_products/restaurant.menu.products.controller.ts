import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateRestaurantMenusProductDto, FindAllRestaurantMenusProductsQueryDto, UpdateRestaurantMenusProductDto } from './restaurant.menu.products.dto';
import { RestaurantMenusProductsEntity } from './restaurant.menu.products.entity';
import { RestaurantMenusProductsService } from './restaurant.menu.products.service';

@ApiTags('Restaurant Menu Products')
@Controller('restaurants/menu-products')
export class RestaurantMenusProductsController {
  constructor(private readonly restaurantMenusProductsService: RestaurantMenusProductsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Menu Product created successfully',
      type: RestaurantMenusProductsEntity
  })
  @ApiBadRequestResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateRestaurantMenusProductDto): Promise<RestaurantMenusProductsEntity> {
    return this.restaurantMenusProductsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all menus that match with the query',
    type: [RestaurantMenusProductsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllRestaurantMenusProductsQueryDto): Promise<RestaurantMenusProductsEntity[]> {
    return this.restaurantMenusProductsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the Menu Product data',
    type: RestaurantMenusProductsEntity
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
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<RestaurantMenusProductsEntity> {
    return this.restaurantMenusProductsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Opening date data updated.',
    type: RestaurantMenusProductsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateRestaurantMenusProductDto): Promise<RestaurantMenusProductsEntity> {
    return this.restaurantMenusProductsService.updateOne(id, body)
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
    return this.restaurantMenusProductsService.remove(id)
  }
}
