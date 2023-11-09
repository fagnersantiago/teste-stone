import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CalculatePricingDto } from '../../dto/calculate.pricing.life.insurance.dto';
import { CalculateInsuranceRepository } from '../infra/database/prisma/repositories/insurance.respository';
import { InvalidAge } from '../errors/invalid-age';
import { InvalidCaptial } from '../errors/invalid-capital';
import { InativeOrInativeOccupation } from '../errors/inative-or- not-found-occupation';

@Injectable()
export class CalculatePrigingInsuranceService {
  constructor(private prisma: CalculateInsuranceRepository) {}

  async execute({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto) {
    try {
      const occupationCodeExists =
        await this.prisma.findOccupationCode(occupationCode);

      if (!occupationCodeExists) {
        throw new InativeOrInativeOccupation();
      }

      const isValidAge = await this.prisma.checkFactorAge(age);

      if (!isValidAge) {
        throw new InvalidAge();
      }

      if (capital < 10000 || capital > 10000000) {
        throw new InvalidCaptial();
      }

      const calculatePricing = await this.prisma.create({
        age,
        capital,
        occupationCode,
        coverages,
      });

      return calculatePricing;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }
}
