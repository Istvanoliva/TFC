import { Router } from 'express';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import MatchController from '../controllers/MatchController';
import ValidateMatch from '../middlewares/validators/ValidateMatch';

const matchesRouter = Router();

const matches = new MatchController();
const token = new TokenMiddleware();
const validate = new ValidateMatch();

matchesRouter.get('/matches', (req, res, next) => matches.getAllMatches(req, res, next));

matchesRouter.post(
  '/matches',
  token.verify,
  validate.checkTeams,
  (req, res, next) => matches.createMatch(req, res, next),
);

matchesRouter.patch(
  '/matches/:id/finish',
  token.verify,
  (req, res, next) => matches.finishMatch(req, res, next),
);

export default matchesRouter;
