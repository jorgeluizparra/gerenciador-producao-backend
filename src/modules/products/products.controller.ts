import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Product created successfully',
    type: ProductsEntity
  })
  @ApiBadRequestResponse({
    description: 'Product category id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateProductDto): Promise<ProductsEntity> {
    return this.productsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all product that match with the query',
    type: [ProductsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  // @ApiQuery({ name: 'company', required: false })
  async findAll(@Query() query: object): Promise<ProductsEntity[]> {
    return this.productsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the product data',
    type: ProductsEntity
  })
  @ApiNotFoundResponse({
    description: 'Product id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<ProductsEntity> {
    return this.productsService.findOne(id, relations.split(','))
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Company data updated.',
    type: ProductsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateProductDto): Promise<ProductsEntity> {
    return this.productsService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: 'Product deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Product id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id)
  }
}
