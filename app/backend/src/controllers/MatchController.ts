import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

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
}

export default MatchController;
