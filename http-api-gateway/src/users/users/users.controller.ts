import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, tap } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    // Request-response approach
    // https://docs.nestjs.com/microservices/nats#request-response
    // https://docs.nats.io/nats-concepts/core-nats/reqreply
    const response = await lastValueFrom(this.natsClient.send({ cmd: 'createUser' }, createUserDto))
    console.log(response)
    return response
  }

  @Get()
  findAll() {
    // return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.usersService.remove(+id);
  }
}
