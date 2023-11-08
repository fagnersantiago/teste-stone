import { randomUUID } from 'node:crypto';

interface Props {
  id?: string;
  age: number;
  occupationCode: string;
  capital: number;
  coverages: string[];
}

export class Insurance {
  private _id?: string;
  public age: number;
  public capital: number;
  public coverages: string[];
  public occupationCode: string;

  get id() {
    return this._id;
  }

  constructor({ id, age, capital, coverages }: Props) {
    this._id = id ?? randomUUID();
    this.age = age;
    this.capital = capital;
    this.coverages = coverages;
  }
}
