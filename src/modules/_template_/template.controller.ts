import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../common.dto';
import { CreateTemplateDto } from './template.dto';
import { TemplatesEntity } from './template.entity';
import { TemplatesService } from './template.service';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Template created successfully',
      type: TemplatesEntity
  })
  @ApiBadRequestResponse({
    description: 'Company id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateTemplateDto): Promise<TemplatesEntity> {
    return this.templatesService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all product categories that match with the query',
    type: [TemplatesEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  // @ApiQuery({ name: 'company', required: false })
  async findAll(@Query() query: object): Promise<TemplatesEntity[]> {
    console.log(query);
    
    return this.templatesService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the template data',
    type: TemplatesEntity
  })
  @ApiNotFoundResponse({
    description: 'Template id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<TemplatesEntity> {
    return this.templatesService.findOne(id)
  }

  @ApiOkResponse({
    description: 'Template deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Template id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.templatesService.remove(id)
  }
}
