import Team from '../database/models/teamModel';
import Match from '../database/models/matchModel';
import HomeBoard from './HomeBoard';
import AwayBoard from './AwayBoard';
import { TArena, IBoard } from '../typescript/interfaces/boardsInterface';

class BoardCreator {
  private homeBoard: HomeBoard;
  private awayBoard: AwayBoard;

  constructor() {
    this.homeBoard = new HomeBoard();
    this.awayBoard = new AwayBoard();
  }

  teamsFilter = (matches: Match[], place: TArena, id: number) => {
    const home = matches.filter((match) => match.homeTeam === id);
    const away = matches.filter((match) => match.awayTeam === id);
    return place === 'home' ? home : away;
  };

  sortTeams = (players: IBoard[]) => players
    .sort((a, b) => b.goalsOwn - a.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints);

  createBoard = (matches: Match[], place: TArena) => {
    let newBoard = this.homeBoard;
    if (place === 'away') newBoard = this.awayBoard;

    return {
      totalPoints: newBoard.totalPoints(matches),
      totalGames: newBoard.totalGames(matches),
      totalVictories: newBoard.victories(matches),
      totalDraws: newBoard.draws(matches),
      totalLosses: newBoard.losses(matches),
      goalsFavor: newBoard.goalsFavor(matches),
      goalsOwn: newBoard.goalsOwn(matches),
      goalsBalance: newBoard.goalsBalance(matches),
      efficiency: newBoard.efficiency(matches),
    };
  };

  getAll = async (teams: Team[], matches: Match[], place: TArena) => {
    const leadersBoard = teams.map((team) => {
      const leader = this.teamsFilter(matches, place, team.id);
      const create = this.createBoard(leader, place);

      return { name: team.teamName, ...create };
    });

    const result = this.sortTeams(leadersBoard);
    return result;
  };
}

export default BoardCreator;
