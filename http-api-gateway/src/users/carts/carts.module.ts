import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
    imports: [NatsClientModule],
    controllers: [CartsController],
    providers: [],
})
export class CartsModule { }
