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
  private _coverageId?: string;
  public name: string;
  public description: string;
  public capital: string;
  public premium: string;
  public isDeleted?: boolean;

  get coverageId() {
    return this._coverageId;
  }

  constructor({
    coverageId,
    name,
    description,
    capital,
    premium,
    isDeleted,
  }: Props) {
    this._coverageId = coverageId ?? randomUUID();
    this.name = name;
    this.description = description;
    this.capital = capital;
    this.premium = premium;
    this.isDeleted = isDeleted ?? false;
  }
}
