import { Controller, Inject } from '@nestjs/common';

import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { ShippingAddress } from 'src/schemas/ShippingAddress.schema';
import { QueryAddressDto } from './dto/query-address.dto';


@Controller()
export class AddressesMicroServiceController {
  constructor(
    private addressesService: AddressesService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy
  ) { }

  @MessagePattern({ cmd: 'createAddress' })
  @RpcCatch()
  async createShippingAddress(@Payload() data: CreateAddressDto) {
    const newAddress = await this.addressesService.createShippingAddress(data)
    if(newAddress){
      this.natsClient.emit('newAddressCreated', newAddress)
    }
    return newAddress
  }

  @MessagePattern({ cmd: 'updateAddress' })
  @RpcCatch()
  async updateShippingAddress(
    @Payload() userId: string,
    @Payload() UpdateUserDto: Partial<ShippingAddress>
  ) {
    return await this.addressesService.updateShippingAddress(userId, UpdateUserDto)
  }

  // @MessagePattern({ cmd: 'getAddress' })
  // @RpcCatch()
  // async getShippingAddress(@Payload() userId: string) {
  //   return await this.addressesService.getShippingAddress(userId)
  // }

  @MessagePattern({ cmd: 'getShippingDetailsById' })
  @RpcCatch()
  async getShippingDetailsById(@Payload() shipping_id: string) {
    return await this.addressesService.getShippingAddress(shipping_id)
  }

  @MessagePattern({ cmd: 'getAddresses' })
  @RpcCatch()
  async getShippingAddresses(
    @Payload() queryUsersDto: QueryAddressDto,
  ) {
    const {page, limit, filter} = queryUsersDto
    return await this.addressesService.getShippingAddresses(filter,page, limit)
  }
}
