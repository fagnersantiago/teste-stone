import { Controller, Param, Patch } from '@nestjs/common';
import { DeleteCoverageService } from './delete.coverage.service';

@Controller('coverage/delete')
export class DeleteCoverageController {
  constructor(private deleteCoverageService: DeleteCoverageService) {}

  @Patch('/:coverageId')
  // @UseGuards(AccessGuard)
  async handle(@Param('coverageId') coverageId: string) {
    const deleted = await this.deleteCoverageService.execute(coverageId);

    return { data: { code: 200, deleted } };
  }
}
