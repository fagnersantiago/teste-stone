import { Controller, Get, Param } from '@nestjs/common';
import { ListCoverageService } from './coverage.service';

@Controller('coverage')
export class ListController {
  constructor(private coverageService: ListCoverageService) {}

  @Get('/:coverageId')
  async handle(@Param('coverageId') param: string) {
    const coverageId = param;

    const coverage = await this.coverageService.execute(coverageId);

    return {
      data: {
        coverageId: coverage.coverageId,
        name: coverage.name,
        description: coverage.description,
        capital: coverage.capital,
        premium: coverage.premium,
      },
    };
  }
}
