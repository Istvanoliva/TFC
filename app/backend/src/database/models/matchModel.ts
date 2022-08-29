import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './teamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;