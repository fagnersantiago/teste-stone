import { CreateCoverageDTO } from '../../../../dto/create.coverage.dto';
import { Coverage } from '../../../../entitie/coverage';
import { UpdateCoverageDto } from 'src/coverage/dto/update.coverage.dto';

export abstract class CoverageRepository {
  abstract create(data: CreateCoverageDTO): Promise<Coverage | null>;

  abstract update(data: UpdateCoverageDto): Promise<Coverage>;
  abstract findById(
    coverageId: string | boolean,
  ): Promise<Coverage | null | undefined>;
  abstract delete(covergeId: string): Promise<boolean>;
}
