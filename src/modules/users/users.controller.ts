import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from 'src/modules/common.dto';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
      description: '',
      type: UsersEntity
  })
  @ApiBadRequestResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiConflictResponse({
    description: '',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(body)
  }

  @Get()
  @ApiOkResponse({
      description: '',
      type: [UsersEntity]
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: object): Promise<UsersEntity[]> {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: '',
    type: UsersEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number): Promise<UsersEntity> {
    return this.usersService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({
    description: '',
    type: UsersEntity
  })
  @ApiNotFoundResponse({
    description: '',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  async updateOne(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<UsersEntity> {
    return this.usersService.updateOne(id, body)
  }

  @ApiOkResponse({
    description: '',
    type: UsersEntity
  })
  @ApiInternalServerErrorResponse({
    description: '',
    type: ErrorMessageDto
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }
}
