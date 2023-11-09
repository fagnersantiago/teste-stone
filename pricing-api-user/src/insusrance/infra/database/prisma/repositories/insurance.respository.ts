import { AgeFactor, Occupation } from '@prisma/client';
import {
  CalculatePremiumResponse,
  CalculatePricingDto,
} from 'src/dto/calculate.pricing.life.insurance.dto';
import { Insurance } from 'src/insusrance/entities/insurance';

export abstract class CalculateInsuranceRepository {
  abstract create({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto): Promise<Insurance | null>;

  abstract checkFactorAge(age: number): Promise<AgeFactor | null>;
  abstract findOccupationCode(
    occupationCode: string,
  ): Promise<Occupation | null>;
  abstract fetchCoverageData(coverages: string[]): Promise<any[]>;

  abstract coveragePremiun({
    age,
    occupationCode,
    coverages,
    capital,
    premium,
  }): Promise<CalculatePremiumResponse>;
}
