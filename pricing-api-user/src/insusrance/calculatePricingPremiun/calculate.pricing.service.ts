import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CalculatePricingDto,
  CalculatePremiumResponse,
} from '../../dto/calculate.pricing.life.insurance.dto';
import { CalculateInsuranceRepository } from '../infra/database/prisma/repositories/insurance.respository';
import { InvalidAge } from '../errors/invalid-age';
import { InvalidCapital } from '../errors/invalid-capital';
import { InactiveOrInativeOccupation } from '../errors/inative-or- not-found-occupation';

@Injectable()
export class CalculateQuoteInsuranceService {
  constructor(private prisma: CalculateInsuranceRepository) {}

  async execute({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto): Promise<CalculatePremiumResponse> {
    try {
      const occupationCodeExists =
        await this.prisma.findOccupationCode(occupationCode);
      if (!occupationCodeExists) {
        throw new InactiveOrInativeOccupation();
      }

      const isValidAge = await this.prisma.checkFactorAge(age);
      if (!isValidAge) {
        throw new InvalidAge();
      }

      if (capital < 10000 || capital > 10000000) {
        throw new InvalidCapital();
      }

      const response = await this.prisma.fetchCoverageData(coverages);

      let totalPremium = 0;

      for (const coverage of response) {
        await this.prisma.coveragePremiun({
          age,
          capital: coverage.capital,
          coverages: coverage.coverageId,
          occupationCode: coverage.occupation,
          premium: Number(coverage.premium),
        });

        const premiumValue = !isNaN(parseFloat(coverage.premium))
          ? parseFloat(coverage.premium)
          : 0;
        totalPremium += premiumValue;
      }

      await this.prisma.create({
        age,
        capital,
        occupationCode,
        coverages: response.map((item) => item.coverageId),
      });

      const calculatePremiumResponse: CalculatePremiumResponse = {
        age,
        occupationCode,
        coverages: response.map((item) => ({
          coverageId: item.coverageId,
          premium: String(Number(item.premium) * totalPremium),
        })) as any,

        premium: response[0].premium,
        capital,
      };
      return calculatePremiumResponse;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
