import { Identifier } from 'sequelize/types';
import HttpError from '../helpers/HttpError';
import Team from '../database/models/teamModel';
import { teamsList, team } from '../typescript/interfaces/teamInterface';

class TeamService {
  getTeams = async (): Promise<teamsList> => Team.findAll();

  getTeam = async (id: Identifier): Promise<team> => {
    const findTeam = await Team.findByPk(id);

    if (!findTeam) throw new HttpError(404, 'Team does not exist');

    return findTeam;
  };
}

export default TeamService;
