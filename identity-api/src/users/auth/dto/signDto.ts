import { Rule } from 'src/users/entitie/user';

export abstract class SingDTO {
  userId: number;
  userName: string;
  password: string;
  rule: Rule;
}

export abstract class ResponseAuth {
  token: string;
}
