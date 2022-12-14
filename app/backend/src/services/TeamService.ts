import { Identifier } from 'sequelize/types';
import HttpError from '../helpers/HttpError';
import Team from '../database/models/teamModel';

class TeamService {
  getTeams = async (): Promise<Team[]> => Team.findAll();

  getTeam = async (id: Identifier): Promise<Team> => {
    const findTeam = await Team.findByPk(id);

    if (!findTeam) throw new HttpError(404, 'Team does not exist');

    return findTeam;
  };

  validateTeam = async (id: number): Promise<void> => {
    const team = await Team.findByPk(id);
    if (!team) throw new HttpError(404, 'There is no team with such id!');
  };
}

export default TeamService;
