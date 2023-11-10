import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ErrorInterceptor } from 'src/coverage/errors/interceptor/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoverageModule } from './coverage/create/coverage.module';
import { JwtMiddleware } from './coverage/auth/jwt.middleware';

//import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // AuthModule,
    CoverageModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
