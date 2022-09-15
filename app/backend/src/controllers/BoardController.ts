import { Request, Response, NextFunction } from 'express';
import BoardService from '../services/BoardService';

class BoardController {
  private service: BoardService;

  constructor() {
    this.service = new BoardService();
  }

  async getHomeBoards(_req: Request, res: Response, next:NextFunction) {
    try {
      const boards = await this.service.getBoards('home');
      return res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  }

  async getAwayBoards(_req: Request, res: Response, next:NextFunction) {
    try {
      const boards = await this.service.getBoards('away');
      return res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  }
}

export default BoardController;
