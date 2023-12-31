import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/insusrance/infra/database/prisma/database.module';
import { CalculateQuoteInsuranceService } from 'src/insusrance/calculatePricingPremiun/calculate.pricing.service';
import { CalculateQuoteInsuranceController } from 'src/insusrance/calculatePricingPremiun/calculate.pricing.controller';
import { ErrorInterceptor } from 'src/insusrance/errors/interceptor/interceptor';
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
export class insuranModule {}
