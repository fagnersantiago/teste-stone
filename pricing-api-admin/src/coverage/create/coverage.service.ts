import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CoverageRepository } from '../infra/database/prisma/repositories/coverage.respository';
import { CreateCoverageDTO } from '../dto/create.coverage.dto';
import { CovegareAlreadyExists } from '../errors/coverage-already-exists.error';

@Injectable()
export class CreateCoverageService {
  constructor(private coverageRepository: CoverageRepository) {}

  async execute(createCoverageDTO: CreateCoverageDTO) {
    try {
      const coverageExists = await this.coverageRepository.findById(
        createCoverageDTO.coverageId,
      );

      if (coverageExists) {
        throw new CovegareAlreadyExists();
      }

      const coverage = await this.coverageRepository.create(createCoverageDTO);

      return coverage;
    } catch (error) {
      console.error('Error in CreateCoverageService', error);
      throw new InternalServerErrorException();
    }
  }
}

import * as crypto from 'crypto';

// Gere um par de chaves
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

console.log('Chave Pública:\n', publicKey);
console.log('Chave Privada:\n', privateKey);
