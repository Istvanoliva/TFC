import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';
import { ICreateMatch } from '../typescript/interfaces/matchesInterface';

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;

      if (inProgress) {
        const currentMatch = await this.service.getProgressMatchs(JSON.parse(inProgress as string));
        return res.status(200).json(currentMatch);
      }

      const matches = await this.service.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const create = req.body as ICreateMatch;
      const newMath = await this.service.createMatch(create);
      return res.status(201).json(newMath);
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const finished = await this.service.finishMatch(Number(id));
      res.status(200).json(finished);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
