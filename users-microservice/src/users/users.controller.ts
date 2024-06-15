import {
  Controller,
  Inject
} from '@nestjs/common';

import {  MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersMicroServiceController {
  constructor() { }

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto) {
    console.log(data)
    return data
  }
}
