import Team from '../database/models/teamModel';
import { teamsList } from '../typescript/interfaces/teamInterface';

class TeamService {
  getTeams = async (): Promise<teamsList> => Team.findAll();
}

export default TeamService;
