import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['*'],
  });

  app.useGlobalPipes(new ValidationPipe()); // Monitorando as rotas

  app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
