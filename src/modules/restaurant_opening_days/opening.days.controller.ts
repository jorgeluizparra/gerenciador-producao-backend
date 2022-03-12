import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateOpeningDayDto, FindAllOpeningDaysQueryDto, UpdateOpeningDayDto } from './opening.days.dto';
import { OpeningDaysEntity } from './opening.days.entity';
import { OpeningDaysService } from './opening.days.service';

@ApiTags('Restaurant Opening Days')
@Controller('opening-days')
export class OpeningDaysController {
  constructor(private readonly openingDaysService: OpeningDaysService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Opening Day created successfully',
      type: OpeningDaysEntity
  })
  @ApiBadRequestResponse({
    description: 'Company id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateOpeningDayDto): Promise<OpeningDaysEntity> {
    return this.openingDaysService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all menus that match with the query',
    type: [OpeningDaysEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllOpeningDaysQueryDto): Promise<OpeningDaysEntity[]> {
    return this.openingDaysService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the Opening Day data',
    type: OpeningDaysEntity
  })
  @ApiNotFoundResponse({
    description: 'Opening Day id not found',
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
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<OpeningDaysEntity> {
    return this.openingDaysService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Opening date data updated.',
    type: OpeningDaysEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateOpeningDayDto): Promise<OpeningDaysEntity> {
    return this.openingDaysService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: 'Opening Day deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Opening Day id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.openingDaysService.remove(id)
  }
}