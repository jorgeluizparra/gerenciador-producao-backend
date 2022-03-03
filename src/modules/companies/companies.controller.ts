import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from 'src/modules/common.dto';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { CompaniesEntity } from './companies.entity';
import { CompaniesService } from './companies.service';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'Company created successfully.',
      type: CompaniesEntity
  })
  @ApiBadRequestResponse({
    description: 'Invalid CNPJ length or CNPJ already signed up.',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateCompanyDto): Promise<CompaniesEntity> {
    return this.companiesService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: 'Return a array of companies that match with the query',
      type: [CompaniesEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: object): Promise<CompaniesEntity[]> {
    return this.companiesService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return a company data.',
    type: CompaniesEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<CompaniesEntity> {
    return this.companiesService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Company data updated.',
    type: CompaniesEntity
  })
  @ApiNotFoundResponse({
    description: 'Not found the id.',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateCompanyDto): Promise<CompaniesEntity> {
    return this.companiesService.updateOne(id, body)
  }

  // @ApiOkResponse({
  //   description: 'Return a company data.',
  //   type: CompaniesEntity
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Something went wrong in this operation.',
  //   type: ErrorMessageDto
  // })
  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.companiesService.remove(id)
  // }
}
