import { Injectable } from '@nestjs/common';
import { CoverageRepository } from '../infra/database/prisma/repositories/coverage.respository';
import { CoverageNotFound } from '../errors/coverage-not-found';

@Injectable()
export class ListCoverageService {
  constructor(private coverageRepository: CoverageRepository) {}

  async execute(coverageId: string) {
    const coverageExists = await this.coverageRepository.findById(coverageId);

    if (!coverageExists) {
      throw new CoverageNotFound();
    }

    return coverageExists;
  }
}
