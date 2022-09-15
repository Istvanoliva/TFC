import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';
import BoardCreator from '../helpers/BoardCreator';
import { TArena } from '../typescript/interfaces/boardsInterface';

class BoardService {
  private creator: BoardCreator;

  constructor() {
    this.creator = new BoardCreator();
  }

  getBoards = async (place: TArena) => {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });

    const result = this.creator.getAll(teams, matches, place);
    return result;
  };
}

export default BoardService;
