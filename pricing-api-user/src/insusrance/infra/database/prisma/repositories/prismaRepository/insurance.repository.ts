import { Injectable } from '@nestjs/common/decorators';
import { Insurance } from 'src/insusrance/entities/insurance';
import { PrismaService } from '../../prisma.service';
import { CalculateInsuranceRepository } from '../insurance.respository';
import {
  CalculatePremiumResponse,
  CalculatePricingDto,
} from 'src/dto/calculate.pricing.life.insurance.dto';
import { AgeFactor, Occupation } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class PrismaCalculatePricingInsuranceRepository
  implements CalculateInsuranceRepository
{
  constructor(private prisma: PrismaService) {}

  private apiUrl = 'http://localhost:3001/coverage';

  async checkFactorAge(age: number): Promise<AgeFactor | null> {
    const checkAge = await this.prisma.ageFactor.findFirst({
      where: {
        age: { lte: age },
      },
      orderBy: { age: 'desc' },
    });

    if (checkAge.age < 18 || checkAge.age > 60) {
      return null;
    }

    return checkAge;
  }

  async findOccupationCode(occupationCode: string): Promise<Occupation> {
    const code = await this.prisma.occupation.findFirst({
      where: {
        code: occupationCode,
      },
    });

    if (!code || !code.active) {
      return null;
    }

    return code;
  }

  async create({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto): Promise<Insurance | null> {
    const calculate = await this.prisma.insurance.create({
      data: {
        age,
        occupationCode,
        capital,
        coverages,
      },
    });

    return calculate;
  }

  async fetchCoverageData(coverages: string[]): Promise<any[]> {
    return Promise.all(
      coverages.map(async (coverageId) => {
        try {
          const response = await axios.get(`${this.apiUrl}/${coverageId}`);

          if (response.data && response.data.data) {
            return response.data.data;
          } else {
            console.error(
              `Erro ao obter cobertura ${coverageId}: Resposta inválida`,
            );
            return null;
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            return null;
          }
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
