import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateCreditCardDto, FindAllCreditCardsQueryDto, UpdateCreditCardDto } from './credit.cards.dto';
import { CreditCardsEntity } from './credit.cards.entity';
import { CreditCardsService } from './credit.cards.service';

@ApiTags('Credit Cards')
@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Credit card created successfully',
      type: CreditCardsEntity
  })
  @ApiBadRequestResponse({
    description: 'Client id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateCreditCardDto): Promise<CreditCardsEntity> {
    return this.creditCardsService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: 'Return all credit cards that match with the query',
      type: [CreditCardsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllCreditCardsQueryDto): Promise<CreditCardsEntity[]> {
    console.log(query);
    
    return this.creditCardsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the credit card data',
    type: CreditCardsEntity
  })
  @ApiNotFoundResponse({
    description: 'Credit card id not found',
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
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<CreditCardsEntity> {
    return this.creditCardsService.findOne(id, relations ? relations.split(',') : [])
  }

  // @Put(':id')
  // @ApiOkResponse({
  //   description: 'Credit card data updated successfully',
  //   type: CreditCardsEntity
  // })
  // @ApiNotFoundResponse({
  //   description: 'Credit card not found',
  //   type: ErrorMessageDto
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Error consulting the database',
  //   type: ErrorMessageDto
  // })
  // async updateOne(@Param('id') id: number, @Body() body: UpdateCreditCardDto): Promise<CreditCardsEntity> {
  //   return this.creditCardsService.updateOne(id, body)
  // }

  @ApiOkResponse({
    description: 'Credit card deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Credit card id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.creditCardsService.remove(id)
  }
}
