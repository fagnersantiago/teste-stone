import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/prisma/database.module';
import { CreateCoverageService } from './coverage.service';
import { CreateCoverageController } from './coverage.controller';
import { ErrorInterceptor } from '../errors/interceptor/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UpdateCoverageController } from '../update/update.coverage.controller';
import { UpdateCoverageService } from '../update/update.coverage.service';
import { DeleteCoverageController } from '../delete/delete.coverage.controller';
import { DeleteCoverageService } from '../delete/delete.coverage.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCoverageController,
    UpdateCoverageController,
    DeleteCoverageController,
  ],
  providers: [
    CreateCoverageService,
    UpdateCoverageService,
    DeleteCoverageService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class CoverageModule {}
