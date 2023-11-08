import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaCalculatePricingInsuranceRepository } from './repositories/prismaRepository/insurance.repository';
import { CalculateInsuranceRepository } from './repositories/insurance.respository';

@Module({
  providers: [
    PrismaService,

    {
      provide: CalculateInsuranceRepository,
      useClass: PrismaCalculatePricingInsuranceRepository,
    },
  ],

  exports: [PrismaService, CalculateInsuranceRepository],
})
export class DatabaseModule {}
