import { randomUUID } from 'node:crypto';

export enum Rule {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
interface Props {
  userId?: string;
  userName: string;
  password: string;
  rule?: Rule;
  createdAt?: Date;
}

export class User {
  private _userId?: string;
  public userName: string;
  public password: string;
  public rule?: string;
  public createdAt?: Date;

  get userId() {
    return this._userId;
  }

  constructor({ userId, userName, password, rule, createdAt }: Props) {
    this._userId = userId ?? randomUUID();
    this.userName = userName;
    this.password = password;
    this.rule = rule ?? Rule.USER;
    this.createdAt = createdAt ?? new Date();
  }
}
