import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorInterceptor } from 'src/insusrance/errors/interceptor/interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap().catch((error) => {
  console.error('Failed to start the application', error);
});
