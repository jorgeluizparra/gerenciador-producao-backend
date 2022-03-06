import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateOpeningHourDto, FindAllOpeningHoursQueryDto, UpdateOpeningHourDto } from './opening.hours.dto';
import { OpeningHoursEntity } from './opening.hours.entity';
import { OpeningHoursService } from './opening.hours.service';

@ApiTags('Opening Hours')
@Controller('opening-hours')
export class OpeningHoursController {
  constructor(private readonly openingHoursService: OpeningHoursService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Product category created successfully',
      type: OpeningHoursEntity
  })
  @ApiBadRequestResponse({
    description: 'Company id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateOpeningHourDto): Promise<OpeningHoursEntity> {
    return this.openingHoursService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all product categories that match with the query',
    type: [OpeningHoursEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllOpeningHoursQueryDto): Promise<OpeningHoursEntity[]> {
    return this.openingHoursService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the product category data',
    type: OpeningHoursEntity
  })
  @ApiNotFoundResponse({
    description: 'Product category id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<OpeningHoursEntity> {
    return this.openingHoursService.findOne(id, relations ? relations.split(',') : [])
  }

  // @Put(':id')
  // @ApiOkResponse({
  //   description: 'Product category data updated.',
  //   type: OpeningHoursEntity
  // })
  // @ApiNotFoundResponse({
  //   description: 'Not found the id.',
  //   type: ErrorMessageDto
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Error consulting the database',
  //   type: ErrorMessageDto
  // })
  // async updateOne(@Param('id') id: number, @Body() body: UpdateOpeningHourDto): Promise<OpeningHoursEntity> {
  //   return this.openingHoursService.updateOne(id, body)
  // }

  @ApiOkResponse({
    description: 'Product category deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Product category id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.openingHoursService.remove(id)
  }
}
