import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './product.categories.dto';
import { ProductCategoriesEntity } from './product.categories.entity';
import { ProductCategoriesService } from './product.categories.service';

@ApiTags('Product Categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Product category created successfully',
      type: ProductCategoriesEntity
  })
  @ApiBadRequestResponse({
    description: 'Company id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateProductCategoryDto): Promise<ProductCategoriesEntity> {
    return this.productCategoriesService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all product categories that match with the query',
    type: [ProductCategoriesEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  // @ApiQuery({ name: 'company', required: false })
  async findAll(@Query() query: object): Promise<ProductCategoriesEntity[]> {
    console.log(query);
    
    return this.productCategoriesService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the product category data',
    type: ProductCategoriesEntity
  })
  @ApiNotFoundResponse({
    description: 'Product category id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<ProductCategoriesEntity> {
    return this.productCategoriesService.findOne(id, relations ? relations.split(',') : [])
  }

  // @Put(':id')
  // @ApiOkResponse({
  //   description: 'Product category data updated.',
  //   type: ProductCategoriesEntity
  // })
  // @ApiNotFoundResponse({
  //   description: 'Not found the id.',
  //   type: ErrorMessageDto
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Error consulting the database',
  //   type: ErrorMessageDto
  // })
  // async updateOne(@Param('id') id: number, @Body() body: UpdateProductCategoryDto): Promise<ProductCategoriesEntity> {
  //   return this.productCategoriesService.updateOne(id, body)
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
    return this.productCategoriesService.remove(id)
  }
}
