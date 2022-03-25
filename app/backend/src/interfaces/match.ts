interface ITeams {
  clubName: string
}

interface IId {
  id: number
}

export interface IScore {
  awayTeamGoals: number
  homeTeamGoals: number
}

export interface IMatch extends IScore {
  homeTeam: number
  awayTeam: number
  inProgress: boolean
}

export interface IMatchWithScore extends IMatch, IId {
  homeClub: ITeams
  awayClub: ITeams
}
