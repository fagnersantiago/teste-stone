import { Injectable } from '@nestjs/common/decorators';
import { Coverage } from 'src/coverage/entitie/coverage';
import { PrismaService } from '../../prisma.service';
import { CoverageRepository } from '../coverage.respository';
import { CreateCoverageDTO } from 'src/coverage/dto/create.coverage.dto';
import { UpdateCoverageDto } from 'src/coverage/dto/update.coverage.dto';

@Injectable()
export class PrismaCoverageRepository implements CoverageRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCoverageDTO): Promise<Coverage | null> {
    const covegare = await this.prisma.coverage.create({
      data: {
        name: data.name,
        description: data.description,
        capital: data.capital,
        premium: data.premium,
      },
    });

    return covegare as Coverage;
  }

  async update(data: UpdateCoverageDto): Promise<Coverage> {
    const coverage = await this.prisma.coverage.update({
      where: {
        coverageId: data.coverageId,
      },
      data: data,
    });
    return coverage as Coverage;
  }

  async findById(coverageId: string): Promise<Coverage | null> {
    console.log(coverageId);
    const coverage = await this.prisma.coverage.findFirst({
      where: {
        coverageId: coverageId,
      },
    });

    if (coverage) {
      return coverage as Coverage;
    }
    return null;
  }

  async delete(covergeId: string): Promise<boolean> {
    await this.prisma.coverage.update({
      where: { coverageId: covergeId },
      data: {
        isDeleted: true,
      },
    });

    return true;
  }
}
