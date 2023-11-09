import { Module } from '@nestjs/common';
import { CalculateQuoteInsuranceService } from './calculate.pricing.service';
import { CalculateQuoteInsuranceController } from './calculate.pricing.controller';
import { DatabaseModule } from '../infra/database/prisma/database.module';
import { ErrorInterceptor } from '../errors/interceptor/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [DatabaseModule],
  controllers: [CalculateQuoteInsuranceController],
  providers: [
    CalculateQuoteInsuranceService,

    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class PrincingModule {}
