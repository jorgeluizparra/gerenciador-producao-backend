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
      description: 'Client created successfully',
      type: ClientsEntity
  })
  @ApiBadRequestResponse({
    description: 'Email or CPF already signed up or invalid CPF',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateClientDto): Promise<ClientsEntity> {
    return this.clientsService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: 'Return all clients that match with query',
      type: [ClientsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: object): Promise<ClientsEntity[]> {
    return this.clientsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the client data',
    type: ClientsEntity
  })
  @ApiNotFoundResponse({
    description: 'Client not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<ClientsEntity> {
    return this.clientsService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Client data updated successfully',
    type: ClientsEntity
  })
  @ApiNotFoundResponse({
    description: 'Client not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateClientDto): Promise<ClientsEntity> {
    return this.clientsService.updateOne(id, body)
  }

  // @ApiOkResponse({
  //   description: ''
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
