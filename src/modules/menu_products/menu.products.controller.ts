import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateMenuProductDto, FindAllMenuProductsQueryDto, UpdateMenuProductDto } from './menu.products.dto';
import { MenuProductsEntity } from './menu.products.entity';
import { MenuProductsService } from './menu.products.service';

@ApiTags('Menu Products')
@Controller('menu-products')
export class MenuProductsController {
  constructor(private readonly menuProductsService: MenuProductsService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Menu Product created successfully',
      type: MenuProductsEntity
  })
  @ApiBadRequestResponse({
    description: 'Restaurant id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateMenuProductDto): Promise<MenuProductsEntity> {
    return this.menuProductsService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all menus that match with the query',
    type: [MenuProductsEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllMenuProductsQueryDto): Promise<MenuProductsEntity[]> {
    return this.menuProductsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the Menu Product data',
    type: MenuProductsEntity
  })
  @ApiNotFoundResponse({
    description: 'Menu Product id not found',
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
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<MenuProductsEntity> {
    return this.menuProductsService.findOne(id, relations ? relations.split(',') : [])
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Opening date data updated.',
    type: MenuProductsEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateMenuProductDto): Promise<MenuProductsEntity> {
    return this.menuProductsService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: 'Menu Product deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Menu Product id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.menuProductsService.remove(id)
  }
}
