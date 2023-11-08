import { Injectable } from '@nestjs/common/decorators';
import { Insurance } from 'src/insusrance/entities/insurance';
import { PrismaService } from '../../prisma.service';
import { CalculateInsuranceRepository } from '../insurance.respository';
import { CalculatePricingDto } from 'src/dto/calculate.pricing.life.insurance.dto';

@Injectable()
export class PrismaCalculatePricingInsuranceRepository
  implements CalculateInsuranceRepository
{
  constructor(private prisma: PrismaService) {}

  // async findAge(
  //   age: number,
  //   occupationCode: string,
  //   capital: number,
  //   coverages: string[],
  // ): Promise<Insurance> {
  //   const ageFactor = await this.prisma.age.findFirst({
  //     where: { age: { lte: age } },
  //     orderBy: { age: 'desc' },
  //   });
  // }

  async create({
    age,
    occupationCode,
    capital,
    coverages,
  }: CalculatePricingDto): Promise<Insurance | null> {
    const calculate = await this.prisma.isurance.create({
      data: {
        age,
        occupationCode,
        capital,
        coverages,
      },
    });

    return calculate;
  }

  // async update(data: UpdateCoverageDto): Promise<Insurance> {
  //   const coverage = await this.prisma.coverage.update({
  //     where: {
  //       coverageId: data.coverageId,
  //     },
  //     data: data,
  //   });
  //   return coverage as Insurance;
  // }

  // async findById(data: any): Promise<Insurance | null> {
  //   const coverageExists = await this.prisma.coverage.findFirst({
  //     where: { coverageId: data.coverageId },
  //   });

  //   if (!coverageExists) {
  //     return null;
  //   }

  //   return coverageExists;
  // }

  // async delete(covergeId: string): Promise<boolean> {
  //   await this.prisma.coverage.update({
  //     where: { coverageId: covergeId },
  //     data: {
  //       isDeleted: true,
  //     },
  //   });

  //   return true;
  //}
}
