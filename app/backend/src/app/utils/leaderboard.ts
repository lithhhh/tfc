import { IMatchWithScore, ILeaderboard, ISortArray, IClub } from '../interfaces';

export default class LeaderboardCreator {
  private sorting: ISortArray[] = [
    { fields: 'totalPoints', direction: 'desc' },
    { fields: 'totalVictories', direction: 'desc' },
    { fields: 'goalsBalance', direction: 'desc' },
    { fields: 'goalsFavor', direction: 'desc' },
    { fields: 'goalsOwn', direction: 'asc' },
  ];

  private totalScore = (id: number, matchs: IMatchWithScore[]): number => {
    const points = matchs.reduce((acc, cur) => {
      if (cur.homeTeam === id) {
        if (cur.homeTeamGoals > cur.awayTeamGoals) return acc + 3;
        if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
      }

      if (cur.awayTeam === id) {
        if (cur.awayTeamGoals > cur.homeTeamGoals) return acc + 3;
        if (cur.awayTeamGoals === cur.homeTeamGoals) return acc + 1;
      }
      return acc;
    }, 0);

    return points;
  };
}
