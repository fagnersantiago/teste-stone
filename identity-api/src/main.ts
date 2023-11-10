import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorInterceptor } from './users/errors/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(3030);
}
bootstrap().catch((error) => {
  console.error('Failed to start the application', error);
});
