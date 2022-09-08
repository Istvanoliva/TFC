import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  async getAllMatches(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
