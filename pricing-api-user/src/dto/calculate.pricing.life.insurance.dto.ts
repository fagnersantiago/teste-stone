import { IsNumber, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CalculatePricingDto {
  @IsNumber()
  age: number;

  @IsString()
  occupationCode: string;

  @IsNumber()
  capital: number;

  @IsArray()
  @ArrayMinSize(1)
  coverages: string[];
}

export class CalculatePremiumResponse {
  age: number;
  occupationCode: string;
  coverages: PremiumResult[];
  capital: number;
  premium: number;
}

export class PremiumResult {
  coverageId: string;
  premium: number;
}
