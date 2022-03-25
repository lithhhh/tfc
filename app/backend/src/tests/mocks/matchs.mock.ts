const matchMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Internacional"
    }
  }
];

const createdMatch = {
	"inProgress": true,
	"id": 49,
	"homeTeam": 1,
	"homeTeamGoals": 1,
	"awayTeam": 16,
	"awayTeamGoals": 4
}

export { createdMatch, matchMock }
