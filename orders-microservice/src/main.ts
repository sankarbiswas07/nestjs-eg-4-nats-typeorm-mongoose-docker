import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { RpcExceptionGlobalFilter } from './utils/rpc-exception.filter';

// This function is dedicated to resolve DTO level exception prior to controller level
function extractConstraintValues(errors: ValidationError[]): string[] {
  return errors.flatMap((error) => Object.values(error.constraints || {})); // Use optional chaining for 'constraints'
}



async function bootstrap() {
  console.log('Orders management: Microservice is Running!');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats'],
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    disableErrorMessages: false,
    exceptionFactory: (errors) => {
      return new RpcException({
        status: 'error',
        message: extractConstraintValues(errors),
        ...{ errors }
      });
    }
  }));

  // Apply the global exception filter
  app.useGlobalFilters(new RpcExceptionGlobalFilter())

  await app.listen();
}
bootstrap();
