import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressesMicroServiceController } from './addresses.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AddressesService } from './addresses.service';
import {User, UserSchema} from '../schemas/User.schema'
import {ShippingAddress, ShippingAddressSchema} from '../schemas/ShippingAddress.schema'

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ShippingAddress.name,
        schema: ShippingAddressSchema,
      },
    ]),
    NatsClientModule
  ],
  controllers: [AddressesMicroServiceController],
  providers: [AddressesService],
})
export class AddressesModule {}
