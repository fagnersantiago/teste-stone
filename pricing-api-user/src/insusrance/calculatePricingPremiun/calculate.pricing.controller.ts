import { Controller, Post, Body } from '@nestjs/common';
import { CalculatePrigingInsuranceService } from './calculate.pricing.service';
import { CalculatePricingDto } from 'src/dto/calculate.pricing.life.insurance.dto';

@Controller('insurance')
export class CalculatePriginInsuranceController {
  constructor(private calculatePricing: CalculatePrigingInsuranceService) {}

  @Post('/calculate')
  async handle(@Body() requestData: CalculatePricingDto) {
    try {
      const result = await this.calculatePricing.execute({
        age: requestData.age,
        occupationCode: requestData.occupationCode,
        capital: requestData.capital,
        coverages: requestData.coverages,
      });
      return { data: result };
    } catch (error) {
      return { error: error.message };
    }
  }
}
