import Match from '../../database/models/matchModel';

export default interface IMatch extends Match {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
