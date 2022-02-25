import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { ErrorMessageDto } from 'src/modules/common.dto';
import { CreateProductCategorieDto } from './product.categories.dto';
import { ProductCategoriesEntity } from './product.categories.entity';
import { ProductCategoriesService } from './product.categories.service';

@ApiTags('Product Categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Post()
  @ApiCreatedResponse({
      description: '',
      type: ProductCategoriesEntity
  })
  @ApiBadRequestResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiConflictResponse({
    description: '',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateProductCategorieDto): Promise<ProductCategoriesEntity> {
    return this.productCategoriesService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: '',
      type: [ProductCategoriesEntity]
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiQuery({ name: 'company', required: false })
  async findAll(@Query() query: object): Promise<ProductCategoriesEntity[]> {
    console.log(query);
    
    return this.productCategoriesService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: '',
    type: ProductCategoriesEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<ProductCategoriesEntity> {
    return this.productCategoriesService.findOne(id)
  }

  @ApiOkResponse({
    description: '',
    type: ProductCategoriesEntity
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productCategoriesService.remove(id)
  }
}
