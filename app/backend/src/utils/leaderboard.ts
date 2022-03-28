import { IMatchWithScore, ILeaderboard, ISortArray } from '../interfaces';

const totalScore = (id: number, matchs: IMatchWithScore[]): number => {
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

const countMatchs = (id: number, matchs: IMatchWithScore[]) => {
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

const resultMatch = (id: number, matchs: IMatchWithScore[]) => {
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

const resGoals = (id: number, matchs: IMatchWithScore[]) => {
  const res = { all: { favor: 0, own: 0 }, home: { favor: 0, own: 0 }, away: { favor: 0, own: 0 } };

  matchs.forEach((cur) => {
    if (cur.homeTeam === id) {
      res.all.favor += cur.homeTeamGoals;
      res.all.own += cur.awayTeamGoals;
      res.home.favor += cur.homeTeamGoals;
      res.home.own += cur.awayTeamGoals;
    }

    if (cur.awayTeam === id) {
      res.away.favor += cur.awayTeamGoals;
      res.away.own += cur.homeTeamGoals;
      res.away.favor += cur.awayTeamGoals;
      res.away.own += cur.homeTeamGoals;
    }
  });

  return { all: res.all, home: res.home, away: res.away };
};
/* P/(J*3)*100 */
const efficiencyCalc = (P: number, J: number) => Number(((P / (J * 3)) * 100).toFixed(2));

const order: ISortArray[] = [
  { fields: 'totalPoints', direction: 'desc' },
  { fields: 'totalVictories', direction: 'desc' },
  { fields: 'goalsBalance', direction: 'desc' },
  { fields: 'goalsFavor', direction: 'desc' },
  { fields: 'goalsOwn', direction: 'asc' },
];
const sortLeaderboard = (
  a: ILeaderboard,
  b: ILeaderboard,
  i: number,
  orderArr: ISortArray[] = order,
): number => {
  const ind = i;
  if (a[orderArr[ind].fields] > b[orderArr[ind].fields]) return -1;
  if (a[orderArr[ind].fields] < b[orderArr[ind].fields]) return 1;
  if (a[orderArr[ind].fields] === b[orderArr[ind].fields]) return sortLeaderboard(a, b, ind + 1);
  return 0;
};

const sortArr = (arr: ILeaderboard[]) => arr
  .sort((a: ILeaderboard, b: ILeaderboard) => sortLeaderboard(a, b, 0));

// possuem opções / foram criados para driblar o chato (lint)

const resultMatchOptionalTeam = (id: number, matchs: IMatchWithScore[]) => {
  const results = {
    home: { win: 0, draw: 0, lose: 0 }, away: { win: 0, draw: 0, lose: 0 },
  };

  matchs.forEach((cur) => {
    if (cur.homeTeam === id) {
      if (cur.homeTeamGoals > cur.awayTeamGoals) results.home.win += 1;
      if (cur.homeTeamGoals === cur.awayTeamGoals) results.home.draw += 1;
      if (cur.homeTeamGoals < cur.awayTeamGoals) results.home.lose += 1;
    }
  });

  matchs.forEach((cur) => {
    if (cur.awayTeam === id) {
      if (cur.awayTeamGoals > cur.homeTeamGoals) results.away.win += 1;
      if (cur.awayTeamGoals === cur.homeTeamGoals) results.away.draw += 1;
      if (cur.awayTeamGoals < cur.homeTeamGoals) results.away.lose += 1;
    }
  });

  return { away: results.away, home: results.home };
};

const totalScoreOptionalTeam = (
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

export {
  totalScore,
  countMatchs,
  resultMatch,
  resGoals,
  efficiencyCalc,
  sortLeaderboard,
  resultMatchOptionalTeam,
  totalScoreOptionalTeam,
  sortArr,
};
