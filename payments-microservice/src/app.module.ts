import { Module } from '@nestjs/common';
import { UsersModule } from './UserProductOrderPayments/user-product-order-payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductOrderPayment } from './typeorm/entities/UserProductOrderPayment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [UserProductOrderPayment],
      synchronize: true,
      username: 'testuser',
      password: 'test_123',

    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
