import { Controller, Post, Body } from '@nestjs/common';
import { CalculateQuoteInsuranceService } from './calculate.pricing.service';
import { CalculatePricingDto } from 'src/dto/calculate.pricing.life.insurance.dto';

@Controller('quote')
export class CalculateQuoteInsuranceController {
  constructor(private calculatePricing: CalculateQuoteInsuranceService) {}

  @Post('/create')
  async handle(@Body() requestData: CalculatePricingDto) {
    try {
      const data = await this.calculatePricing.execute({
        age: requestData.age,
        occupationCode: requestData.occupationCode,
        capital: requestData.capital,
        coverages: requestData.coverages,
      });
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  }
}
