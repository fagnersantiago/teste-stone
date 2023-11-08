import { CalculatePricingDto } from 'src/dto/calculate.pricing.life.insurance.dto';
import { Insurance } from 'src/insusrance/entities/insurance';

export abstract class CalculateInsuranceRepository {
  abstract create({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto): Promise<Insurance | null>;

  // abstract findAge(
  //   age: number,
  //   occupationCode: string,
  //   capital: number,
  //   coverages: string[],
  // ): Promise<Insurance>;
  // abstract update(data: UpdateCoverageDto): Promise<Insurance>;
  // abstract findById(coverageId: string): Promise<Insurance | null>;
  // abstract delete(covergeId: string): Promise<boolean>;
}
