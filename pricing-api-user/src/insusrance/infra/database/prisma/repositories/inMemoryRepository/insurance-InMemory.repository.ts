import { Insurance } from '@prisma/client';
import { CalculateInsuranceRepository } from '../insurance.respository';
import {
  CalculatePremiumResponse,
  CalculatePricingDto,
} from 'src/dto/calculate.pricing.life.insurance.dto';
import { AgeFactor, Occupation } from '@prisma/client';
import axios from 'axios';
export class InMemoryQuotePricingRepository
  implements CalculateInsuranceRepository
{
  private insuranceQuoteRepository: Insurance[] = [];
  private OcuppationRepository: Occupation[] = [];
  private ageFactorReposiotry: AgeFactor[] = [];
  private readonly apiUrl = 'http://localhost:3001/coverage/';

  async checkIsValidAge(age: number): Promise<boolean> {
    const checkAge = this.insuranceQuoteRepository.find(
      (find) => find.age === age,
    );

    if (checkAge.age < 18 || checkAge.age > 60) return false;

    return true;
  }

  async findOccupationCode(occupationCode: string): Promise<Occupation | null> {
    return this.OcuppationRepository.find(
      (find) => find.code === occupationCode || !find.active,
    );
  }

  async checkFactorAge(age: number): Promise<AgeFactor | null> {
    this.ageFactorReposiotry.filter((filter) => {
      const checkAge = filter.age;
      if (age <= 18 || age >= 60) return null;
      return checkAge;
    });

    return;
  }

  async create({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto): Promise<Insurance | null> {
    const calculate = Object.assign({
      age,
      occupationCode,
      capital,
      coverages,
    });

    this.insuranceQuoteRepository.push(calculate);

    return calculate;
  }
  async fetchCoverageData(coverages: string[]): Promise<any[]> {
    return Promise.all(
      coverages.map(async (coverageId) => {
        try {
          const response = await axios.get(`${this.apiUrl}/${coverageId}`);
          return response.data;
        } catch (error) {
          console.error(
            `Erro ao obter cobertura ${coverageId}: ${error.message}`,
          );
          return null;
        }
      }),
    );
  }

  async coveragePremiun({
    age,
    occupationCode,
    coverages,
    capital,
  }): Promise<CalculatePremiumResponse> {
    const ageFactor = await this.checkFactorAge(age);
    const occupation = await this.findOccupationCode(occupationCode);

    const coverageFactor = Math.ceil(capital / coverages.capital);
    const calculatePremium =
      coverageFactor *
      Number(coverages.premium) *
      ageFactor.factor *
      Number(occupation.code);

    return {
      coverages,
      premium: Number(calculatePremium),
    } as CalculatePremiumResponse;
  }
}
