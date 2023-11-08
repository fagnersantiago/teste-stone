import { Module } from '@nestjs/common';
import { CalculatePrigingInsuranceService } from './calculate.pricing.service';
import { CalculatePriginInsuranceController } from './calculate.pricing.controller';
import { DatabaseModule } from '../infra/database/prisma/database.module';
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
export class PrincingModule {}
