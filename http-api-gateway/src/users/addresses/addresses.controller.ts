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
import { ClientProxy } from '@nestjs/microservices';
import { AsyncWrapper } from 'src/utils/async-wrapper.decorator';
import { lastValueFrom } from 'rxjs';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';


@Controller()
export class AddressesController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post('create')
  @AsyncWrapper()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'createAddress' }, createAddressDto)
    );
    return response;
  }

  @Get()
  @AsyncWrapper()
  async findAll(@Query() query) {
    const { page, limit, filter } = query;

    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'getAddresses' }, { page, limit, filter })
    );
    return response;
  }

  @Get(':id')
  @AsyncWrapper()
  async findOne(@Param('id') id: string) {
    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'getAddress' }, { id })
    );
    return response;
  }

  @Patch(':id')
  @AsyncWrapper()
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const response = await lastValueFrom(
      this.natsClient
        .send({ cmd: 'updateAddress' }, { id, ...updateAddressDto })
    );
    return response;
  }
}
