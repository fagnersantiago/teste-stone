import { Controller, Post, Body } from '@nestjs/common';
import { CreateCoverageService } from './coverage.service';
import { CreateCoverageDTO } from '../dto/create.coverage.dto';
//import { AuthGuard } from '@nestjs/passport';
//import { AccessGuard } from '../auth/strategies/access.guards';

@Controller('coverage')
export class CreateCoverageController {
  constructor(private coverageService: CreateCoverageService) {}

  @Post('/create')
  //@UseGuards(AccessGuard)
  async handle(@Body() body: CreateCoverageDTO) {
    const { name, description, premium, capital } = body;
    console.log(body);
    const coverage = await this.coverageService.execute({
      name,
      description,
      premium,
      capital,
    });

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
