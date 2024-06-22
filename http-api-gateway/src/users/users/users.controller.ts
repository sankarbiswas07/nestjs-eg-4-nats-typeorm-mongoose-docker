import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Query
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AsyncWrapper } from 'src/utils/async-wrapper.decorator';
import { QueryUsersDto } from './dto/query-users.dto';

@Controller()
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post('create')
  @AsyncWrapper()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'createUser' }, createUserDto)
    );
    return response;
  }

  @Get()
  @AsyncWrapper()
  async findAll(@Query() query: QueryUsersDto) {
    const { page, limit, filter } = query;

    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'getUsers' }, { page, limit, filter })
    );
    return response;
  }

  @Get(':id')
  @AsyncWrapper()
  async findOne(@Param('id') id: string) {
    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'getUser' }, { id })
    );
    return response;
  }

  @Patch(':id')
  @AsyncWrapper()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'updateUser' }, { id, ...updateUserDto })
    );
    return response;
  }
}
