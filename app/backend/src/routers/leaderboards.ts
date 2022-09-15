import { Router } from 'express';
import BoardController from '../controllers/BoardController';

const boardsRouter = Router();

const board = new BoardController();

boardsRouter.get('/leaderboard/home', (req, res, next) => board.getHomeBoards(req, res, next));

export default boardsRouter;
