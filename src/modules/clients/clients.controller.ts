import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from 'src/modules/common.dto';
import { CreateClientDto, UpdateClientDto } from './clients.dto';
import { ClientsEntity } from './clients.entity';
import { ClientsService } from './clients.service';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiCreatedResponse({
      description: '',
      type: ClientsEntity
  })
  @ApiBadRequestResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiConflictResponse({
    description: '',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateClientDto): Promise<ClientsEntity> {
    return this.clientsService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: '',
      type: [ClientsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: object): Promise<ClientsEntity[]> {
    return this.clientsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: '',
    type: ClientsEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<ClientsEntity> {
    return this.clientsService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({
    description: '',
    type: ClientsEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateClientDto): Promise<ClientsEntity> {
    return this.clientsService.updateOne(id, body)
  }

  // @ApiOkResponse({
  //   description: '',
  //   type: ClientsEntity
  // })
  // @ApiInternalServerErrorResponse({
  //   description: '',
  //   type: ErrorMessageDto
  // })
  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.clientsService.remove(id)
  // }
}
