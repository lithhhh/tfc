import { IMatchWithScore, ILeaderboard, ISortArray, IClub } from '../interfaces';

export default class LeaderboardCreator {
  private sorting: ISortArray[] = [
    { fields: 'totalPoints', direction: 'desc' },
    { fields: 'totalVictories', direction: 'desc' },
    { fields: 'goalsBalance', direction: 'desc' },
    { fields: 'goalsFavor', direction: 'desc' },
    { fields: 'goalsOwn', direction: 'asc' },
  ];
}
