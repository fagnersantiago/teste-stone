import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/prisma/database.module';
import { CalculatePrigingInsuranceService } from './calculate.pricing.inusrance.service';
import { CalculatePriginInsuranceController } from './calculate.pricing.insurance.controller';
import { ErrorInterceptor } from '../errors/interceptor/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [DatabaseModule],
  controllers: [CalculatePriginInsuranceController],
  providers: [
    CalculatePrigingInsuranceService,

    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class CalculatePrincingInsuranceModule {}
