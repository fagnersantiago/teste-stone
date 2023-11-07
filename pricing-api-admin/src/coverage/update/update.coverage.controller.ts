import { Controller, Patch, Body, Param } from '@nestjs/common';
import { UpdateCoverageService } from './update.coverage.service';
//import { AuthGuard } from '@nestjs/passport';
import { UpdateCoverageDto } from '../dto/update.coverage.dto';
//import { AccessGuard } from '../auth/strategies/access.guards';
//@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UpdateCoverageController {
  constructor(private updateCoverageService: UpdateCoverageService) {}

  @Patch('/coverage')
  // @UseGuards(AccessGuard)
  async handle(
    @Param('coverageId') coverageId: string,
    @Body()
    body: UpdateCoverageDto,
  ) {
    const { name, premium, capital, description } = body;

    const update = await this.updateCoverageService.execute({
      coverageId,
      name,
      premium,
      capital,
      description,
    });

    return {
      data: {
        coverageId: update.coverageId,
        name: update.name,
        description: update.description,
        capital: update.capital,
        premium: update.premium,
      },
    };
  }
}
