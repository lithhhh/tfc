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

  private countMatchs = (id: number, matchs: IMatchWithScore[]) => {
    const all = matchs.reduce((acc, cur) => {
      if (cur.homeTeam === id || cur.awayTeam === id) return acc + 1;

      return acc;
    }, 0);

    const home = matchs.reduce((acc, cur) => {
      if (cur.homeTeam === id) return acc + 1;

      return acc;
    }, 0);

    const away = matchs.reduce((acc, cur) => {
      if (cur.awayTeam === id) return acc + 1;

      return acc;
    }, 0);

    return { all, home, away };
  };

  private resultMatch = (id: number, matchs: IMatchWithScore[]) => {
    const results = { win: 0, draw: 0, lose: 0 };

    matchs.forEach((cur) => {
      if (cur.homeTeam === id) {
        if (cur.homeTeamGoals > cur.awayTeamGoals) results.win += 1;
        if (cur.homeTeamGoals === cur.awayTeamGoals) results.draw += 1;
        if (cur.homeTeamGoals < cur.awayTeamGoals) results.lose += 1;
      }
    });

    matchs.forEach((cur) => {
      if (cur.awayTeam === id) {
        if (cur.awayTeamGoals > cur.homeTeamGoals) results.win += 1;
        if (cur.awayTeamGoals === cur.homeTeamGoals) results.draw += 1;
        if (cur.awayTeamGoals < cur.homeTeamGoals) results.lose += 1;
      }
    });

    return results;
  };

  private resGoals = (id: number, matchs: IMatchWithScore[]) => {
    const res = {
      all: { favor: 0, own: 0 }, home: { favor: 0, own: 0 }, away: { favor: 0, own: 0 },
    };

    matchs.forEach((cur) => {
      if (cur.homeTeam === id) {
        res.all.favor += cur.homeTeamGoals;
        res.all.own += cur.awayTeamGoals;
        res.home.favor += cur.homeTeamGoals;
        res.home.own += cur.awayTeamGoals;
      }

      if (cur.awayTeam === id) {
        res.all.favor += cur.awayTeamGoals;
        res.all.own += cur.homeTeamGoals;
        res.away.favor += cur.awayTeamGoals;
        res.away.own += cur.homeTeamGoals;
      }
    });

    return res;
  };
}
