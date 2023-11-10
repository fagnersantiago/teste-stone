import { ListCoverageService } from './coverage.service';
import { InMemoryCoverageRepository } from '../infra/database/prisma/repositories/inMemoryRepository/coverage-InMemory.repository';
import { CoverageNotFound } from '../errors/coverage-not-found';

let inMemoryCoveryRepository: InMemoryCoverageRepository;
let listCoverageService: ListCoverageService;

describe('Create Coverage', () => {
  beforeEach(() => {
    inMemoryCoveryRepository = new InMemoryCoverageRepository();
    listCoverageService = new ListCoverageService(inMemoryCoveryRepository);
  });

  it('Should be List coverage by Id', async () => {
    const sut = await inMemoryCoveryRepository.create({
      coverageId: '123456',
      name: 'fake-coverage',
      description: 'fake-description',
      capital: '1000',
      premium: 'fake-premiun',
    });

    const list = await listCoverageService.execute(sut.coverageId);

    expect(list).toBe(sut);
  });

  it('Should not be able to list an exiting coverage', async () => {
    await expect(async () => {
      await inMemoryCoveryRepository.create({
        coverageId: '123456',
        name: 'fake-coverage',
        description: 'fake-description',
        capital: '1000',
        premium: 'fake-premiun',
      });

      await listCoverageService.execute('WRONGID');
    }).rejects.toBeInstanceOf(CoverageNotFound);
  });
});
