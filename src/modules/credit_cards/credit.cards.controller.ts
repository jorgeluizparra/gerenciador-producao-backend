import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { ErrorMessageDto } from 'src/modules/common.dto';
import { CreateCreditCardDto } from './credit.cards.dto';
import { CreditCardsEntity } from './credit.cards.entity';
import { CreditCardsService } from './credit.cards.service';

@ApiTags('Credit Cards')
@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  @ApiCreatedResponse({
      description: '',
      type: CreditCardsEntity
  })
  @ApiBadRequestResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiConflictResponse({
    description: '',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateCreditCardDto): Promise<CreditCardsEntity> {
    return this.creditCardsService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: '',
      type: [CreditCardsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiQuery({ name: 'company', required: false })
  async findAll(@Query() query: object): Promise<CreditCardsEntity[]> {
    console.log(query);
    
    return this.creditCardsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: '',
    type: CreditCardsEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<CreditCardsEntity> {
    return this.creditCardsService.findOne(id)
  }

  @ApiOkResponse({
    description: '',
    type: CreditCardsEntity
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.creditCardsService.remove(id)
  }
}
