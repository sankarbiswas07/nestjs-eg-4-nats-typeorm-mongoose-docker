import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { CartsMicroServiceController } from './carts.controller';
import { CartsService } from './carts.service';
@Module({
  imports:[NatsClientModule],
  controllers: [CartsMicroServiceController],
  providers: [CartsService],
})
export class CartsModule {}
