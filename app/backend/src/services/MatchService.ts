import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';

class MatchService {
  getAllMatches = async (): Promise<Match[]> => Match.findAll({ include: [
    { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
    { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
  ] });

  getProgressMatchs = async (inProgress: boolean): Promise<Match[]> => Match.findAll({ include: [
    { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
    { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
  ],
  where: { inProgress } });
}

export default MatchService;
