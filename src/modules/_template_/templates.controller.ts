import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from 'src/modules/common.dto';
import { CreateTemplateDto, UpdateTemplateDto } from './templates.dto';
import { TemplatesEntity } from './templates.entity';
import { TemplatesService } from './templates.service';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @ApiCreatedResponse({
      description: '',
      type: TemplatesEntity
  })
  @ApiBadRequestResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiConflictResponse({
    description: '',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateTemplateDto): Promise<TemplatesEntity> {
    return this.templatesService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: '',
      type: [TemplatesEntity]
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findAll(): Promise<TemplatesEntity[]> {
    return this.templatesService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: '',
    type: TemplatesEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<TemplatesEntity> {
    return this.templatesService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({
    description: '',
    type: TemplatesEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateTemplateDto): Promise<TemplatesEntity> {
    return this.templatesService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: '',
    type: TemplatesEntity
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.templatesService.remove(id)
  }
}
