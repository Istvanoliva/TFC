import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Secret, SignOptions } from 'jsonwebtoken';
import IToken from '../typescript/interfaces/tokenInterface';

dotenv.config();

const jwtConfig: SignOptions = { expiresIn: '5d', algorithm: 'HS256' };

const SECRET: Secret = process.env.JWT_SECRET || 'jwt_secret';

export const jwtGenerator = (data: IToken) => jwt.sign({ ...data }, SECRET, jwtConfig);

export const verifyToken = (token: string) => jwt.verify(token, SECRET);
