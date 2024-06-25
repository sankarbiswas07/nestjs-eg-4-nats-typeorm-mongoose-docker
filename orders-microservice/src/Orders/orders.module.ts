import { Module } from '@nestjs/common';
import { OrdersMicroserviceController } from './orders.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrders } from 'src/typeorm/entities/UserOrder.entity';
import { OrdersService } from './orders.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserOrders]),
    NatsClientModule
  ],
  controllers: [OrdersMicroserviceController],
  providers: [OrdersService],
})
export class OrdersModule {}
