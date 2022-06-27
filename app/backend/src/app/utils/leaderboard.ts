import { IMatchWithScore, ILeaderboard, ISortArray, IClub } from '../interfaces';

export default class LeaderboardCreator {
  private sorting: ISortArray[] = [
    { fields: 'totalPoints', direction: 'desc' },
    { fields: 'totalVictories', direction: 'desc' },
    { fields: 'goalsBalance', direction: 'desc' },
    { fields: 'goalsFavor', direction: 'desc' },
    { fields: 'goalsOwn', direction: 'asc' },
    { fields: 'efficiency', direction: 'asc' }
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

  /* P/(J*3)*100 */
  private efficiencyClub = (P: number, J: number) => Number(((P / (J * 3)) * 100).toFixed(2));

  private resultMatchOptionalTeam = (id: number, matchs: IMatchWithScore[]) => {
    const home = { win: 0, draw: 0, lose: 0 };
    const away = { win: 0, draw: 0, lose: 0 };

    matchs.forEach((cur) => {
      if (cur.homeTeam === id) {
        if (cur.homeTeamGoals > cur.awayTeamGoals) home.win += 1;
        if (cur.homeTeamGoals === cur.awayTeamGoals) home.draw += 1;
        if (cur.homeTeamGoals < cur.awayTeamGoals) home.lose += 1;
      }
    });

    matchs.forEach((cur) => {
      if (cur.awayTeam === id) {
        if (cur.awayTeamGoals > cur.homeTeamGoals) away.win += 1;
        if (cur.awayTeamGoals === cur.homeTeamGoals) away.draw += 1;
        if (cur.awayTeamGoals < cur.homeTeamGoals) away.lose += 1;
      }
    });

    return { away, home };
  };

  private totalScoreOptionalTeam = (
    id: number,
    matchs: IMatchWithScore[],
  ) => {
    const pointsHomeTeam = matchs.reduce((acc, cur) => {
      if (cur.homeTeam === id) {
        if (cur.homeTeamGoals > cur.awayTeamGoals) return acc + 3;
        if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
      }

      return acc;
    }, 0);

    const pointsAwayTeam = matchs.reduce((acc, cur) => {
      if (cur.awayTeam === id) {
        if (cur.awayTeamGoals > cur.homeTeamGoals) return acc + 3;
        if (cur.awayTeamGoals === cur.homeTeamGoals) return acc + 1;
      }
      return acc;
    }, 0);

    return { home: pointsHomeTeam, away: pointsAwayTeam };
  };

  private sortLeaderboard = (
    a: ILeaderboard,
    b: ILeaderboard,
    i: number,
    orderArr: ISortArray[] = this.sorting,
  ): number => {
    const ind = i;
    if (a[orderArr[ind].fields] > b[orderArr[ind].fields]) return -1;
    if (a[orderArr[ind].fields] < b[orderArr[ind].fields]) return 1;
    if (a[orderArr[ind].fields] === b[orderArr[ind].fields]) {
      return this.sortLeaderboard(a, b, ind + 1);
    }
    return 0;
  };

  private sortArrLeaderboard = (arr: ILeaderboard[]) => arr
    .sort((a: ILeaderboard, b: ILeaderboard) => this.sortLeaderboard(a, b, 0));

  // cada function é uma regra de negócio que itera sobre o id dos clubs para identificação do time,
  // e as matchs que registram onde tais times jogaram, extraindo dados para montagem da tabela de leaderboard.

  public leaderboard(clubs: IClub[], matchs: IMatchWithScore[]) {
    const disorganizedLeaderboardclubs = clubs.map(({ clubName, id }) => ({
      name: clubName,
      totalPoints: this.totalScore(id, matchs as []),
      totalGames: this.countMatchs(id, matchs as []).all,
      totalVictories: this.resultMatch(id, matchs as []).win,
      totalDraws: this.resultMatch(id, matchs as []).draw,
      totalLosses: this.resultMatch(id, matchs as []).lose,
      goalsFavor: this.resGoals(id, matchs as []).all.favor,
      goalsOwn: this.resGoals(id, matchs as []).all.own,
      goalsBalance: this.resGoals(id, matchs as []).all.favor - this.resGoals(id, matchs as [])
        .all.own,
      efficiency: this.efficiencyClub(
        this.totalScore(id, matchs as []),
        this.countMatchs(id, matchs as []).all,
      ),
    }));

    return this.sortArrLeaderboard(disorganizedLeaderboardclubs);
  }

  public leaderboardOptional(clubs: IClub[], matchs: IMatchWithScore[], team: 'away' | 'home') {
    const disorganizedLeaderboardclubs = clubs.map(({ clubName, id }) => ({
      name: clubName,
      totalPoints: this.totalScoreOptionalTeam(id, matchs as [])[team],
      totalGames: this.countMatchs(id, matchs as [])[team],
      totalVictories: this.resultMatchOptionalTeam(id, matchs as [])[team].win,
      totalDraws: this.resultMatchOptionalTeam(id, matchs as [])[team].draw,
      totalLosses: this.resultMatchOptionalTeam(id, matchs as [])[team].lose,
      goalsFavor: this.resGoals(id, matchs as [])[team].favor,
      goalsOwn: this.resGoals(id, matchs as [])[team].own,
      goalsBalance: this
        .resGoals(id, matchs as [])[team].favor - this.resGoals(id, matchs as [])[team].own,
      efficiency: this.efficiencyClub(
        this.totalScoreOptionalTeam(id, matchs as [])[team],
        this.countMatchs(id, matchs as [])[team],
      ),
    }));

    return this.sortArrLeaderboard(disorganizedLeaderboardclubs);
  }
}
