export interface ILeaderboard {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface ISortArray {
  fields: 'totalPoints' | 'totalVictories' | 'goalsBalance' | 'goalsOwn' | 'goalsFavor' | 'efficiency'
  direction: 'asc' | 'desc'
}
