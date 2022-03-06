import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessageDto } from '../../utils/common.dto';
import { CreateUserDto, FindAllUsersQueryDto } from './users.dto';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
      description: 'User created successfully',
      type: UsersEntity
  })
  @ApiBadRequestResponse({
    description: 'Email already signed up',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(body)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all users that match with query',
    type: [UsersEntity]
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findAll(@Query() query: FindAllUsersQueryDto): Promise<UsersEntity[]> {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the user data',
    type: UsersEntity
  })
  @ApiNotFoundResponse({
    description: 'User id not found',
    type: ErrorMessageDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Error consulting the database',
    type: ErrorMessageDto
  })
  async findOne(@Param('id') id: number, @Query('relations') relations: string ): Promise<UsersEntity> {
    return this.usersService.findOne(id, relations ? relations.split(',') : [])
  }

  // @Put(':id')
  // @ApiOkResponse({
  //   description: 'User data updated successfully',
  //   type: UsersEntity
  // })
  // @ApiNotFoundResponse({
  //   description: 'User id not found',
  //   type: ErrorMessageDto
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Error consulting the database',
  //   type: ErrorMessageDto
  // })
  // async updateOne(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<UsersEntity> {
  //   return this.usersService.updateOne(id, body)
  // }

  // @ApiOkResponse({
  //   description: ''
  // })
  // @ApiInternalServerErrorResponse({
  //   description: '',
  //   type: ErrorMessageDto
  // })
  // @Delete(':id')
  // async remove(@Param('id') id: number): Promise<void> {
  //   return this.usersService.remove(id)
  // }
}
