import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamsRouter = Router();

const teams = new TeamController();

teamsRouter.get('/teams', (req, res, next) => teams.getTeams(req, res, next));

teamsRouter.get('/teams/:id', (req, res, next) => teams.getTeam(req, res, next));

export default teamsRouter;
