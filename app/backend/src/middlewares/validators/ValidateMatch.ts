import { Request, Response, NextFunction } from 'express';
import HttpError from '../../helpers/HttpError';

class ValidateMatch {
  checkTeams = (req: Request, _res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      throw new HttpError(401, 'It is not possible to create a match with two equal teams');
    }
    next();
  };
}

export default ValidateMatch;
