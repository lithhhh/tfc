import { IMatchWithScore, ILeaderboard, ISortArray } from '../interfaces';

const getTotalScore = (id: number, matchs: IMatchWithScore[]): number => {
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

const countMatchs = (id: number, matchs: IMatchWithScore[]): number => {
  const count = matchs.reduce((acc, cur) => {
    if (cur.homeTeam === id || cur.awayTeam === id) return acc + 1;

    return acc;
  }, 0);

  return count;
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

const resultGoals = (id: number, matchs: IMatchWithScore[]) => {
  const results = { favor: 0, own: 0 };

  matchs.forEach((cur) => {
    if (cur.homeTeam === id) {
      results.favor += cur.homeTeamGoals;
      results.own += cur.awayTeamGoals;
    }

    if (cur.awayTeam === id) {
      results.favor += cur.awayTeamGoals;
      results.own += cur.homeTeamGoals;
    }
  });

  return { results, balance: results.favor - results.own };
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

export {
  getTotalScore,
  countMatchs,
  resultMatch,
  resultGoals,
  efficiencyCalc,
  sortLeaderboard,
  sortArr,
};
