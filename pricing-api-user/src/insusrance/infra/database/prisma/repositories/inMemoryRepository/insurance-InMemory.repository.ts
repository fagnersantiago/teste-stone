import { Insurance } from 'src/insusrance/entities/insurance';
import { InsuranceRepository } from '../insurance.respository';
import { CalculatePricingDto } from 'src/dto/calculate.pricing.life.insurance.dto';

export class InMemoryCoverageRepository implements InsuranceRepository {
  private calculateprincingRepository: Insurance[] = [];

  // async update(data: UpdateCoverageDto): Promise<Insurance> {
  //   const updatedCoverege = new Insurance({
  //     coverageId: data.coverageId,
  //     name: data.name,
  //     description: data.description,
  //     capital: data.capital,
  //     premium: data.premium,
  //   });

  //   this.coverageRepository.push(updatedCoverege);

  //   return updatedCoverege;
  // }

  async create({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto): Promise<Insurance | null> {
    const calculate = new Insurance({
      age,
      occupationCode,
      capital,
      coverages,
    });

    this.calculateprincingRepository.push(calculate);

    return calculate;
  }

  // async findById(coverageId: string): Promise<Insurance | null> {
  //   const coverage = this.coverageRepository.find(
  //     (find) => find.coverageId === coverageId,
  //   );

  //   return coverage;
  // }
  // async delete(coverageId: string): Promise<boolean> {
  //   const deletaCoverage = this.coverageRepository.find(
  //     (find) => find.coverageId === coverageId,
  //   );

  //   if (deletaCoverage) {
  //     deletaCoverage.isDeleted = true;
  //   }
  //   return true;
  // }
  // async findAge(
  //   age: number,
  //   occupationCode: string,
  //   capital: number,
  //   coverages: string[],
  // ): Promise<Insurance> {
  //   throw new Error('Method not implemented.');
  // }
}
