import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamsRouter = Router();

const teams = new TeamController();

teamsRouter.get('/teams', (req, res, next) => teams.getTeams(req, res, next));

export default teamsRouter;
