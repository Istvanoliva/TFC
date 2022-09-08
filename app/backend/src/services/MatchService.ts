import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';

class MatchService {
  getAllMatches = async () => Match.findAll({ include: [
    { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
    { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
  ] });
}

export default MatchService;
