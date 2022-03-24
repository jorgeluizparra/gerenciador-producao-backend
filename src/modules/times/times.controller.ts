import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateTimeDto, FindAllTimesQueryDto } from './times.dto';
import { TimesEntity } from './times.entity';
import { TimesService } from './times.service';

@ApiTags('Times')
@Controller('times')
export class TimesController {
  constructor(private readonly timesService: TimesService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Time created successfully.',
      type: TimesEntity
  })
  @ApiBadRequestResponse({
    description: 'Invalid CNPJ length or CNPJ already signed up.',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateTimeDto): Promise<TimesEntity> {
    return this.timesService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: 'Return a array of times that match with the query',
      type: [TimesEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllTimesQueryDto): Promise<TimesEntity[]> {
    return this.timesService.findAll(query)
  }

}
