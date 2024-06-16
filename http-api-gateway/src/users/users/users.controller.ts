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

  // @Post('create')
  // create(@Body() createUserDto) {
  //   // Request-response approach
  //   // https://docs.nestjs.com/microservices/nats#request-response
  //   // https://docs.nats.io/nats-concepts/core-nats/reqreply
  //   return this.natsClient.send({ cmd: 'createUser' }, createUserDto)
  // }


  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const response = await lastValueFrom(
        this.natsClient.send({ cmd: 'createUser' }, createUserDto)
      );

      if (response.status === 'error') {
        throw new HttpException(response, HttpStatus.BAD_REQUEST);
      }

      return response;
    } catch (error) {
      console.error('Error from microservice:', error);

      // Check if the error has a status and message for structured response
      if (error.status && error.message) {
        throw new HttpException(
          { status: 'error', message: error.message, errors: error.errors },
          HttpStatus.BAD_REQUEST
        );
      }

      // Fallback for unexpected errors
      throw new HttpException(
        { status: 'error', message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
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
