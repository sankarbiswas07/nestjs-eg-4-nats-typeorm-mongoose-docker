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

@Controller('profile')
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

  @Get(':_id')
  @AsyncWrapper()
  async findOne(@Param('_id') _id: string) {
    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'getUser' }, { _id })
    );
    return response;
  }

  @Patch(':_id')
  @AsyncWrapper()
  async update(@Param('_id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id)

    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'updateUser' }, { user_id: id, updateUserDto })
    );
    return response;
  }
}
