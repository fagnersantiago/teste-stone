import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaCalculatePricingInsuranceRepository } from './repositories/prismaRepository/insurance.repository';
import { InsuranceRepository } from './repositories/insurance.respository';

@Module({
  providers: [
    PrismaService,

    {
      provide: InsuranceRepository,
      useClass: PrismaCalculatePricingInsuranceRepository,
    },
  ],
  exports: [PrismaService, InsuranceRepository],
})
export class DatabaseModule {}
