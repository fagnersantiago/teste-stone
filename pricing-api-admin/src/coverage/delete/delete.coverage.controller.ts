import { Controller, Param, Patch } from '@nestjs/common';
import { DeleteCoverageService } from './delete.coverage.service';

@Controller('users')
export class DeleteCoverageController {
  constructor(private deleteCoverageService: DeleteCoverageService) {}

  @Patch('/coverage')
  // @UseGuards(AccessGuard)
  async handle(@Param('coverageId') coverageId: string) {
    const update = await this.deleteCoverageService.execute(coverageId);

    return { data: { update } };
  }
}
