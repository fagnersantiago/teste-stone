import { CoverageRepository } from '../infra/database/prisma/repositories/coverage.respository';
import { Injectable } from '@nestjs/common';
import { CreateCoverageDTO } from '../dto/create.coverage.dto';
import { CovegareAlreadyExists } from '../errors/coverage-already-exists.error';

@Injectable()
export class CreateCoverageService {
  constructor(private coverageRepository: CoverageRepository) {}

  async execute({
    coverageId,
    name,
    description,
    capital,
    premium,
  }: CreateCoverageDTO) {
    const coverageExists = await this.coverageRepository.findById(coverageId);

    if (coverageExists) {
      throw new CovegareAlreadyExists();
    }

    const coverage = await this.coverageRepository.create({
      name,
      capital,
      description,
      premium,
    });

    return coverage;
  }
}
