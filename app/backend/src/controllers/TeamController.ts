import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  async getTeams(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getTeams();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamController;
