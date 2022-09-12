export const matchesMock = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: 'São Paulo'
      },
      teamAway: {
        teamName: 'Grêmio'
      },
    },
    {
      id: 2,
      homeTeam: 3,
      homeTeamGoals: 0,
      awayTeam: 2,
      awayTeamGoals: 3,
      inProgress: false,
      teamHome: {
        teamName: 'Botafogo'
      },
      teamAway: {
        teamName: 'Bahia'
      },
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: 'São Paulo'
      },
      teamAway: {
        teamName: 'Internacional'
      },
    },
  ];

  export const inProgress = matchesMock.filter((team) => team.inProgress === true);
  export const finished = matchesMock.filter((team) => team.inProgress === false);

  export const newMatch = {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2
  };

  export const createdMatch = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  }

  export const updateGoals = {
    homeTeamGoals: 7,
    awayTeamGoals: 1,
  }