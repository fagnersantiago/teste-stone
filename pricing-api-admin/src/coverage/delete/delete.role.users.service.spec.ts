import { DeleteCoverageService } from './delete.coverage.service';
import { InMemoryCoverageRepository } from '../infra/database/prisma/repositories/inMemoryRepository/coverage-InMemory.repository';

let createInMemoryUserRepository: InMemoryCoverageRepository;
let updateCoverageService: DeleteCoverageService;

describe(' Delete coverage', () => {
  beforeEach(() => {
    createInMemoryUserRepository = new InMemoryCoverageRepository();
    updateCoverageService = new DeleteCoverageService(
      createInMemoryUserRepository,
    );
  });

  it('shoude be able sof delete an coverage', async () => {
    const sut = await createInMemoryUserRepository.create({
      name: 'fake-coverage',
      description: 'fake-description',
      capital: '1000',
      premium: 'fake-premiun',
    });

    const update = await updateCoverageService.execute(sut.coverageId);

    expect(update).toBe(true);
  });
});
