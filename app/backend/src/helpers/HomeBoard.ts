import Match from '../database/models/matchModel';

class HomeBoard {
  goalsFavor = (matchesHome: Match[]) => matchesHome
    .reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

  goalsOwn = (matchesHome: Match[]) => matchesHome
    .reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

  goalsBalance = (matches: Match[]) => {
    const goalsFavor = this.goalsFavor(matches);
    const goalsOwn = this.goalsOwn(matches);
    return goalsFavor - goalsOwn;
  };

  victories = (matches: Match[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);

  losses = (matches: Match[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc), 0);

  draws = (matches: Match[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc), 0);

  totalPoints = (matches: Match[]) => {
    const victories = this.victories(matches) * 3;
    const draws = this.draws(matches);
    return victories + draws;
  };

  totalGames = (matchesHome: Match[]) => matchesHome.length;

  efficiency = (matches: Match[]) => {
    const points = this.totalPoints(matches);
    const games = this.totalGames(matches);
    return Number(((points / (games * 3)) * 100).toFixed(2));
  };
}

export default HomeBoard;
