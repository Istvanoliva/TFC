import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';
import TeamService from './TeamService';
import { ICreateMatch } from '../typescript/interfaces/matchesInterface';

class MatchService {
  teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getAllMatches = async (): Promise<Match[]> => Match.findAll({ include: [
    { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
    { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
  ] });

  getProgressMatchs = async (inProgress: boolean): Promise<Match[]> => Match.findAll({ include: [
    { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
    { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
  ],
  where: { inProgress } });

  createMatch = async (newMatch: ICreateMatch): Promise<Match> => {
    const { homeTeam, awayTeam } = newMatch;

    await this.teamService.validateTeam(homeTeam);
    await this.teamService.validateTeam(awayTeam);

    const createMatch = await Match.create({ ...newMatch, inProgress: true });
    return createMatch;
  };
}

export default MatchService;
