import { Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestUser } from '../typescript/interfaces/tokenInterface';
import HttpError from '../helpers/HttpError';
import { verifyToken } from '../helpers/jwtGenerator';

class tokenMiddleware {
  verify = (req: RequestUser, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;

      if (!token) throw new HttpError(401, 'Token not found');

      const { dataValues } = verifyToken(token) as JwtPayload;

      req.user = dataValues;

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default tokenMiddleware;
