import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorInterceptor } from './coverage/errors/interceptor/interceptor/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(3001);
}
bootstrap().catch((error) => {
  console.error('Failed to start the application', error);
});
