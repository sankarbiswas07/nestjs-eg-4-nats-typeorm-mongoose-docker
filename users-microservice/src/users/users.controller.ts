import {
  Controller,
  Inject
} from '@nestjs/common';

import {  MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersMicroServiceController {
  constructor() { }

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data) {
    console.log(data)
    return data
  }
}
