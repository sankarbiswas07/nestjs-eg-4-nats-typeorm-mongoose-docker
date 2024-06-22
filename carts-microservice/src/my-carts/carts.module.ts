import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
@Module({
  imports:[
    NatsClientModule
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
