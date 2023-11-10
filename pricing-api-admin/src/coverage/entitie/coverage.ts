import { randomUUID } from 'node:crypto';

interface Props {
  coverageId?: string;
  name: string;
  description: string;
  capital: string;
  premium: string;
  isDeleted?: boolean;
}

export class Coverage {
  public coverageId?: string;
  public name: string;
  public description: string;
  public capital: string;
  public premium: string;
  public isDeleted?: boolean;

  constructor({
    coverageId,
    name,
    description,
    capital,
    premium,
    isDeleted,
  }: Props) {
    this.coverageId = coverageId ?? randomUUID();
    this.name = name;
    this.description = description;
    this.capital = capital;
    this.premium = premium;
    this.isDeleted = isDeleted ?? false;
  }
}
