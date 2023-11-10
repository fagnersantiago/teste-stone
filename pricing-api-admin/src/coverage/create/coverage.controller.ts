import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCoverageService } from './coverage.service';
import { CreateCoverageDTO } from '../dto/create.coverage.dto';

@Controller('coverage')
export class CreateCoverageController {
  constructor(private coverageService: CreateCoverageService) {}

  @Post('/create')
  async handle(
    @Body() { name, description, premium, capital }: CreateCoverageDTO,
  ) {
    try {
      const coverage = await this.coverageService.execute({
        name,
        description,
        premium,
        capital,
      });

      return {
        data: {
          coverageId: coverage.coverageId,
          name: coverage.name,
          description: coverage.description,
          capital: coverage.capital,
          premium: coverage.premium,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
