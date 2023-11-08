import { randomUUID } from 'node:crypto';

interface Props {
  id: string;
  code: string;
  name: string;
  active: boolean;
  factor: number;
}

export class Occupation {
  private _id?: string;
  public code: string;
  public name: string;
  public active: boolean;

  get id() {
    return this._id;
  }

  constructor({ id, code, name, active }: Props) {
    this._id = id ?? randomUUID();
    this.code = code;
    this.name = name;
    this.active = active;
  }
}
