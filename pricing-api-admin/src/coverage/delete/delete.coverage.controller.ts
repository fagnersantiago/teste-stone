import { Controller, Param, Patch } from '@nestjs/common';
import { DeleteCoverageService } from './delete.coverage.service';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('coverage/delete')
@UseGuards(AuthGuard('jwt'))
export class DeleteCoverageController {
  constructor(private deleteCoverageService: DeleteCoverageService) {}

  @Patch('/:coverageId')
  @UseGuards(JwtMiddleware)
  async handle(@Param('coverageId') coverageId: string) {
    const deleted = await this.deleteCoverageService.execute(coverageId);

    return { data: { code: 200, deleted } };
  }
}
