import { CoverageRepository } from '../infra/database/prisma/repositories/coverage.respository';
import { Injectable } from '@nestjs/common';
import { CoverageNotFound } from '../errors/coverage-not-found';

@Injectable()
export class DeleteCoverageService {
  constructor(private deleteCoverageRepository: CoverageRepository) {}

  async execute(coverageId: string) {
    const coverageExists =
      await this.deleteCoverageRepository.findById(coverageId);

    if (!coverageExists) {
      throw new CoverageNotFound();
    }

    const coverage = await this.deleteCoverageRepository.delete(coverageId);

    return coverage;
  }
}
