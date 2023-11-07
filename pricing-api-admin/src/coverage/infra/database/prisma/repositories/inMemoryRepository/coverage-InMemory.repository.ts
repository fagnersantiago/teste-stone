import { CreateCoverageDTO } from 'src/coverage/dto/create.coverage.dto';
import { Coverage } from '../../../../../entitie/coverage';
import { CoverageRepository } from '../coverage.respository';
import { UpdateCoverageDto } from 'src/coverage/dto/update.coverage.dto';

export class InMemoryCoverageRepository implements CoverageRepository {
  private coverageRepository: Coverage[] = [];

  async update(data: UpdateCoverageDto): Promise<Coverage> {
    const updatedCoverege = new Coverage({
      coverageId: data.coverageId,
      name: data.name,
      description: data.description,
      capital: data.capital,
      premium: data.premium,
    });

    this.coverageRepository.push(updatedCoverege);

    return updatedCoverege;
  }

  async create(data: CreateCoverageDTO): Promise<Coverage | null> {
    const coverage = new Coverage({
      name: data.name,
      description: data.description,
      capital: data.capital,
      premium: data.premium,
    });

    this.coverageRepository.push(coverage);

    return coverage;
  }

  async findById(coverageId: string): Promise<Coverage | null> {
    const coverage = this.coverageRepository.find(
      (find) => find.coverageId === coverageId,
    );

    return coverage;
  }
  async delete(coverageId: string): Promise<boolean> {
    const deletaCoverage = this.coverageRepository.find(
      (find) => find.coverageId === coverageId,
    );

    if (deletaCoverage) {
      deletaCoverage.isDeleted = true;
    }
    return true;
  }
}
