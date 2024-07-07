import { Controller } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto, UserIdDto } from './dto/query-users.dto';

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
    @Payload() data: { user_id: UserIdDto, updateUserDto: UpdateUserDto }
  ) {
    const { user_id, updateUserDto } = data
    console.log(user_id)
    console.log(updateUserDto)
    return await this.usersService.updateUser(user_id, updateUserDto)
  }

  @MessagePattern({ cmd: 'getUser' })
  @RpcCatch()
  async getUser(@Payload() user_id: UserIdDto) {
    return await this.usersService.getUser(user_id)
  }

  @MessagePattern({ cmd: 'getUsers' })
  @RpcCatch()
  async getUsers(
    @Payload() queryUsersDto: QueryUsersDto,
  ) {
    const { page, limit, filter } = queryUsersDto
    return await this.usersService.getUsers(page, limit, filter)
  }

  @EventPattern('newAddressCreated')
  newAddressCreated(@Payload() data: any) {
    console.log('EventPattern: newAddressCreated')
    console.log(data);
    return this.usersService.updateUserAddress(data.user_id, data._id)
  }
}
