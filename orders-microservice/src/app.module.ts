import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrders } from './typeorm/entities/UserOrder.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'mysql_db',
      port: 3306,
      database: 'orders_management',
      entities: [UserOrders],
      synchronize: true,
      username: 'test_user',
      password: 'test_pwd',

    }),
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
