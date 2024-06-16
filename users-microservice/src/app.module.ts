import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password@mongo_db:27017/users_db?authSource=admin', {retryAttempts: 3}),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
