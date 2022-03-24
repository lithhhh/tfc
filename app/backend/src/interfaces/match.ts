interface ITeams {
  clubName: string
}

interface IId {
  id: number
}

export interface IMatch {
  homeTeam: number
  awayTeam: number
  awayTeamGoals: number
  homeTeamGoals: number
  inProgress: boolean
}

export interface IMatchWithScore extends IMatch, IId {
  homeClub: ITeams
  awayClub: ITeams
}
