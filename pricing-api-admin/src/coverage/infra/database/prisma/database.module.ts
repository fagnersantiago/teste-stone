import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaCoverageRepository } from './repositories/prismaRepository/coverage.repository';
import { CoverageRepository } from './repositories/coverage.respository';

@Module({
  providers: [
    PrismaService,

    {
      provide: CoverageRepository,
      useClass: PrismaCoverageRepository,
    },
  ],
  exports: [PrismaService, CoverageRepository],
})
export class DatabaseModule {}
