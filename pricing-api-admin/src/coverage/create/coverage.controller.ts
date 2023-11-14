import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCoverageService } from './coverage.service';
import { CreateCoverageDTO } from '../dto/create.coverage.dto';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { UseGuards } from '@nestjs/common';

@Controller('coverage')
export class CreateCoverageController {
  constructor(private coverageService: CreateCoverageService) {}

  @Post('/create')
  @UseGuards(JwtMiddleware)
  async handle(
    @Body()
    { coverageId, name, description, premium, capital }: CreateCoverageDTO,
  ) {
    try {
      const coverage = await this.coverageService.execute({
        coverageId,
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
      console.log('Error in CreateCoverageController:', error);
      throw new InternalServerErrorException();
    }
  }
}
