import { Module } from '@nestjs/common';
import { UsersMicroServiceController } from './users.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    NatsClientModule
  ],
  controllers: [UsersMicroServiceController],
  providers: [UsersService],
})
export class UsersModule {}
