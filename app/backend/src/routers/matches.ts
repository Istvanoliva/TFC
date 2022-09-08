import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchesRouter = Router();

const matches = new MatchController();

matchesRouter.get('/matches', (req, res, next) => matches.getAllMatches(req, res, next));

export default matchesRouter;
