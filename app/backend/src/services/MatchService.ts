import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';
import TeamService from './TeamService';
import { ICreateMatch } from '../typescript/interfaces/matchesInterface';
import HttpError from '../helpers/HttpError';

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

  updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number)
  : Promise<object> => {
    const match = await Match.findOne({ where: { id } });

    if (!match || match?.inProgress === false) {
      throw new HttpError(401, 'Match already over or does not exist!');
    }

    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'Match updated!' };
  };

  finishMatch = async (id: number): Promise<object> => {
    const [match] = await Match.update({ inProgress: false }, { where: { id } });
    if (!match) throw new HttpError(404, 'There is no team with such id!');
    return { message: 'Finished' };
  };
}

export default MatchService;
