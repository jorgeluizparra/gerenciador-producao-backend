import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateStationDto, FindAllStationsQueryDto } from './stations.dto';
import { StationsEntity } from './stations.entity';
import { StationsService } from './stations.service';

@ApiTags('Stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Station created successfully.',
      type: StationsEntity
  })
  @ApiBadRequestResponse({
    description: 'Invalid CNPJ length or CNPJ already signed up.',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateStationDto): Promise<StationsEntity> {
    return this.stationsService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: 'Return a array of stations that match with the query',
      type: [StationsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllStationsQueryDto): Promise<StationsEntity[]> {
    return this.stationsService.findAll(query)
  }

}
