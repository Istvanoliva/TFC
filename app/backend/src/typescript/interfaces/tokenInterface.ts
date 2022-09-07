import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface IToken {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface RequestUser extends Request {
  user?: object,
}

export interface IDecode extends JwtPayload {
  user: object,
}
