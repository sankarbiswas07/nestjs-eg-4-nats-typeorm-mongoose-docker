import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password@mongo_db:27017/users_management?authSource=admin', {retryAttempts: 3}),
    UsersModule,
    AddressesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
