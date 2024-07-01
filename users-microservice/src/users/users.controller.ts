import { Controller } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/User.schema';
import { QueryUsersDto } from './dto/query-users.dto';

@Controller()
export class UsersMicroServiceController {
  constructor(private usersService: UsersService) { }

  @MessagePattern({ cmd: 'createUser' })
  @RpcCatch()
  async createUser(@Payload() data: CreateUserDto) {
    return await this.usersService.createUser(data)
  }

  @MessagePattern({ cmd: 'updateUser' })
  @RpcCatch()
  async updateUser(
    @Payload() userId: string,
    @Payload() UpdateUserDto: Partial<User>
  ) {
    return await this.usersService.updateUser(userId, UpdateUserDto)
  }

  @MessagePattern({ cmd: 'getUser' })
  @RpcCatch()
  async getUser(@Payload() userId: string) {
    return await this.usersService.getUser(userId)
  }

  @MessagePattern({ cmd: 'getUsers' })
  @RpcCatch()
  async getUsers(
    @Payload() queryUsersDto: QueryUsersDto,
  ) {
    const {page, limit, filter} = queryUsersDto
    return await this.usersService.getUsers(page, limit, filter)
  }

  @EventPattern('newAddressCreated')
  newAddressCreated(@Payload() data: any) {
    console.log(data);
    console.log('EventPattern: newAddressCreated')
    return this.usersService.updateUserAddress(data.user_id, data._id)
  }
}
