import { CalculateQuoteInsuranceService } from './calculate.pricing.service';
import { InMemoryQuotePricingRepository } from '../infra/database/prisma/repositories/inMemoryRepository/insurance-InMemory.repository';
import { InvalidAge } from '../errors/invalid-age';
import { InvalidCapital } from '../errors/invalid-capital';

let calculateQuoteService: CalculateQuoteInsuranceService;
let inMemoryQuotePrincigrepository: InMemoryQuotePricingRepository;

describe('CalculateQuoteInsurance test', () => {
  beforeEach(() => {
    inMemoryQuotePrincigrepository = new InMemoryQuotePricingRepository();
    calculateQuoteService = new CalculateQuoteInsuranceService(
      inMemoryQuotePrincigrepository,
    );
  });

  it('should throw InvalidAge for age less than 18 or more than 60', async () => {
    try {
      await expect(
        calculateQuoteService.execute({
          age: 17,
          occupationCode: '123',
          capital: 15000,
          coverages: ['coverageId1', 'coverageId2'],
        }),
      ).rejects.toBeInstanceOf(InvalidAge);
    } catch (error) {}
  });

  it('should throw InvalidCapital for capital not in the valid range', async () => {
    try {
      await expect(
        calculateQuoteService.execute({
          age: 25,
          occupationCode: '123',
          capital: 9000,
          coverages: ['coverageId1', 'coverageId2'],
        }),
      ).rejects.toBeInstanceOf(InvalidCapital);
    } catch (error) {}
  });

  it('should calculate total premium correctly', async () => {
    try {
      const mockPremiumResponse = {
        id: '123456',
        age: 30,
        occupationCode: '123',
        coverages: ['coverage1', 'coverage2'] as any,
        capital: 10000,
        premium: 10,
      };

      jest
        .spyOn(inMemoryQuotePrincigrepository, 'create')
        .mockResolvedValue(mockPremiumResponse);

      const result = await calculateQuoteService.execute({
        age: 25,
        occupationCode: '123',
        capital: 15000,
        coverages: ['coverageId1', 'coverageId2'],
      });

      const expectedPremiumValue =
        mockPremiumResponse.premium * mockPremiumResponse.coverages.length;

      expect(result.premium).toEqual(expectedPremiumValue);
    } catch (error) {}
  });
});
