import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';

@Controller()
export class UsersMicroServiceController {
  constructor(private usersService: UsersService) { }

  @MessagePattern({ cmd: 'createUser' })
  @RpcCatch()
  async createUser(@Payload() data: CreateUserDto) {
      return await this.usersService.createUser(data)
  }
}
