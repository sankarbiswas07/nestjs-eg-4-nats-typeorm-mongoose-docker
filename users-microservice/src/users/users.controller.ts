import {
  Controller,
  Inject
} from '@nestjs/common';

import {  MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersMicroServiceController {
  constructor(private usersService: UsersService) { }

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto) {
    console.log('-------Create User---------')
    console.log(data);

    return this.usersService
    .createUser(data)
  }
}
