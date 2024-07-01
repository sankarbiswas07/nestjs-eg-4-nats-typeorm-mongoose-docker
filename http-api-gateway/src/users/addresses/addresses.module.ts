import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports:[NatsClientModule],
  controllers: [AddressesController],
  providers: [],
})
export class AddressesModule {}
