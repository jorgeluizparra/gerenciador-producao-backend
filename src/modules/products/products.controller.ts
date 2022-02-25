import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from 'src/modules/common.dto';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({
      description: '',
      type: ProductsEntity
  })
  @ApiBadRequestResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiConflictResponse({
    description: '',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateProductDto): Promise<ProductsEntity> {
    return this.productsService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: '',
      type: [ProductsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findAll(): Promise<ProductsEntity[]> {
    return this.productsService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: '',
    type: ProductsEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<ProductsEntity> {
    return this.productsService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({
    description: '',
    type: ProductsEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateProductDto): Promise<ProductsEntity> {
    return this.productsService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: '',
    type: ProductsEntity
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id)
  }
}
