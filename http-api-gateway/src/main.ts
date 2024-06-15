import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validatorOptions = {
    forbidUnknownValues: true
  }

  app.useGlobalPipes(new ValidationPipe(validatorOptions))

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
}

bootstrap();
