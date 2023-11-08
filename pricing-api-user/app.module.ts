import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ErrorInterceptor } from 'src/insusrance/errors/interceptor/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CalculatePrincingInsuranceModule } from 'src/insusrance/calculatePricingPremiun/calculate.pricing.module';
//import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // AuthModule,
    CalculatePrincingInsuranceModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
