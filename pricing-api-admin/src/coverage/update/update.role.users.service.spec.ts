import { UpdateCoverageService } from './update.coverage.service';
import { InMemoryCoverageRepository } from '../infra/database/prisma/repositories/inMemoryRepository/coverage-InMemory.repository';

let createInMemoryUserRepository: InMemoryCoverageRepository;
let updateCoverageService: UpdateCoverageService;

describe(' Update coverage', () => {
  beforeEach(() => {
    createInMemoryUserRepository = new InMemoryCoverageRepository();
    updateCoverageService = new UpdateCoverageService(
      createInMemoryUserRepository,
    );
  });

  it('Admin should be update coverage', async () => {
    const sut = await createInMemoryUserRepository.create({
      name: 'fake-coverage',
      description: 'fake-description',
      capital: '1000',
      premium: 'fake-premiun',
    });

    const update = await updateCoverageService.execute({
      coverageId: sut.coverageId,
      name: 'Update-fake-name-coverage',
    });

    expect(update.name).toBe('Update-fake-name-coverage');
  });
});
