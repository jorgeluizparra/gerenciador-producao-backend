import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateRestaurantDto, FindAllRestaurantsQueryDto, UpdateRestaurantDto } from './restaurants.dto';
import { RestaurantsEntity } from './restaurants.entity';
import { RestaurantsService } from './restaurants.service';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Restaurant created successfully',
    type: RestaurantsEntity
  })
  @ApiBadRequestResponse({
    description: 'Restaurant category id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateRestaurantDto): Promise<RestaurantsEntity> {
    return this.restaurantsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all restaurant that match with the query',
    type: [RestaurantsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllRestaurantsQueryDto): Promise<RestaurantsEntity[]> {
    return this.restaurantsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the restaurant data',
    type: RestaurantsEntity
  })
  @ApiNotFoundResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<RestaurantsEntity> {
    return this.restaurantsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Company data updated.',
    type: RestaurantsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateRestaurantDto): Promise<RestaurantsEntity> {
    return this.restaurantsService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: 'Restaurant deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.restaurantsService.remove(id)
  }
}
