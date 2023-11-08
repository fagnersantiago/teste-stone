import { Injectable } from '@nestjs/common';
import { CalculatePricingDto } from '../../dto/calculate.pricing.life.insurance.dto';
import { CalculateInsuranceRepository } from '../infra/database/prisma/repositories/insurance.respository';
@Injectable()
export class CalculatePrigingInsuranceService {
  constructor(private prisma: CalculateInsuranceRepository) {}

  async execute({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto) {
    // Busque o fator de idade apropriado do banco de dados.

    // if (!ageFactor) {
    //   throw new Error('Fator de idade não encontrado');
    // }

    // // Busque o fator de ocupação do banco de dados.
    // const occupationFactor = await this.prisma.occupation.findFirst({
    //   where: { code: occupationCode, status: 'ATIVO' },
    // });

    // if (!occupationFactor) {
    //   throw new Error('Fator de ocupação não encontrado');
    // }

    const calculatePricing = await this.prisma.create({
      age,
      capital,
      occupationCode,
      coverages,
    });

    return calculatePricing;

    // const coverageResults = await Promise.all(
    //   coverages.map(async (coverageId) => {
    //     const coverage = await this.prisma.coverage.findUnique({
    //       where: { id: coverageId },
    //     });

    //     if (!coverage) {
    //       throw new Error(`Cobertura com ID ${coverageId} não encontrada`);
    //     }

    //     // Calculo do prêmio da cobertura
    //     const coveragePremium =
    //       Math.ceil((capital / coverage.capital) * coverage.premium) *
    //       ageFactor.factor *
    //       occupationFactor.factor;

    //     return { coverageId, premium: coveragePremium };
    //   }),
    // );

    // // Soma dos prêmios das coberturas
    // const totalPremium = coverageResults.reduce(
    //   (total, coverageResult) => total + coverageResult.premium,
    //   0,
    // );

    // return {
    //   ageFactor: ageFactor.factor,
    //   occupationFactor: occupationFactor.factor,
    //   coverages: coverageResults,
    //   capital,
    //   premium: totalPremium,
    // };
  }
}
