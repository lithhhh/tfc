import ClubsService from './clubs';
import MatchsService from './matchs';
import { getTotalScore,
  countMatchs,
  resultMatch,
  resultGoals,
  efficiencyCalc,
  sortArr,
} from '../utils';

export default class LeaderboardService {
  constructor(
    private match = new MatchsService(),
    private clubs = new ClubsService(),
  ) {}

  async getLeaderboard() {
    const { clubs } = await this.clubs.clubsRequest();
    const { matchs } = await this.match.inProgressRequest(false);

    const leaderboard = clubs.map(({ clubName, id }) => {
      const score = {
        name: clubName,
        totalPoints: getTotalScore(id, matchs as []),
        totalGames: countMatchs(id, matchs as []),
        totalVictories: resultMatch(id, matchs as []).win,
        totalDraws: resultMatch(id, matchs as []).draw,
        totalLosses: resultMatch(id, matchs as []).lose,
        goalsFavor: resultGoals(id, matchs as []).results.favor,
        goalsOwn: resultGoals(id, matchs as []).results.own,
        goalsBalance: resultGoals(id, matchs as []).balance,
        efficiency: efficiencyCalc(getTotalScore(id, matchs as []), countMatchs(id, matchs as [])),
      };

      return score;
    });

    return { code: 200, leaderboard: sortArr(leaderboard) };
  }
}
