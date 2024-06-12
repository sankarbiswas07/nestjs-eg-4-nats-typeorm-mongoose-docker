import { Module } from '@nestjs/common';
import { UsersMicroServiceController } from './users.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports:[NatsClientModule],
  controllers: [UsersMicroServiceController],
  providers: [],
})
export class UsersModule {}
