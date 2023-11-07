import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ErrorInterceptor } from './coverage/errors/interceptor/interceptor/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoverageModule } from './coverage/create/coverage.module';
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
export class AppModule {}
