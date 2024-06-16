import { Module } from '@nestjs/common';
import { UserProductOrderPaymentMicroServiceController } from './user-product-orders.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { UserProductOrderPaymentsService } from './user-product-orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductOrderPayment } from 'src/typeorm/entities/UserProductOrderPayment';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserProductOrderPayment]),
    NatsClientModule
  ],
  controllers: [UserProductOrderPaymentMicroServiceController],
  providers: [UserProductOrderPaymentsService],
})
export class UsersModule {}
