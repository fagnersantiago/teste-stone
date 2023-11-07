import { Module } from '@nestjs/common';
import { CreateCoverageService } from './coverage.service';
import { CreateCoverageController } from './coverage.controller';
import { DatabaseModule } from '../infra/database/prisma/database.module';
import { ErrorInterceptor } from '../errors/interceptor/interceptor/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UpdateCoverageController } from '../update/update.coverage.controller';
import { UpdateCoverageService } from '../update/update.coverage.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCoverageController, UpdateCoverageController],
  providers: [
    CreateCoverageService,
    UpdateCoverageService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class CoverageModule {}
