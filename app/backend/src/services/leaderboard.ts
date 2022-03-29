import ClubsService from './clubs';
import MatchsService from './matchs';
import {
  totalScore,
  countMatchs,
  resultMatch,
  resGoals,
  efficiencyCalc,
  sortArr,
  totalScoreOptionalTeam,
  resultMatchOptionalTeam,
} from '../utils';

export default class LeaderboardService {
  constructor(
    private match = new MatchsService(),
    private clubs = new ClubsService(),
  ) {}

  async getLeaderboard() {
    const { clubs } = await this.clubs.clubsRequest();
    const { matchs } = await this.match.inProgressRequest(false);
    // cada function é uma regra de negócio que itera sobre o id dos clubs para identificação do time,
    // e as matchs que registram onde tais times jogaram, extraindo dados para montagem da tabela de leaderboard.
    const leaderboard = clubs.map(({ clubName, id }) => ({
      name: clubName,
      totalPoints: totalScore(id, matchs as []),
      totalGames: countMatchs(id, matchs as []).all,
      totalVictories: resultMatch(id, matchs as []).win,
      totalDraws: resultMatch(id, matchs as []).draw,
      totalLosses: resultMatch(id, matchs as []).lose,
      goalsFavor: resGoals(id, matchs as []).all.favor,
      goalsOwn: resGoals(id, matchs as []).all.own,
      goalsBalance: resGoals(id, matchs as []).all.favor - resGoals(id, matchs as []).all.own,
      efficiency: efficiencyCalc(
        totalScore(id, matchs as []),
        countMatchs(id, matchs as []).all,
      ),
    }));

    return { code: 200, leaderboard: sortArr(leaderboard) };
  }

  async getLeaderboardAwayOrHome(team: 'away' | 'home') {
    const { clubs } = await this.clubs.clubsRequest();
    const { matchs } = await this.match.inProgressRequest(false);

    const leaderboard = clubs.map(({ clubName, id }) => ({
      name: clubName,
      totalPoints: totalScoreOptionalTeam(id, matchs as [])[team],
      totalGames: countMatchs(id, matchs as [])[team],
      totalVictories: resultMatchOptionalTeam(id, matchs as [])[team].win,
      totalDraws: resultMatchOptionalTeam(id, matchs as [])[team].draw,
      totalLosses: resultMatchOptionalTeam(id, matchs as [])[team].lose,
      goalsFavor: resGoals(id, matchs as [])[team].favor,
      goalsOwn: resGoals(id, matchs as [])[team].own,
      goalsBalance: resGoals(id, matchs as [])[team].favor - resGoals(id, matchs as [])[team].own,
      efficiency: efficiencyCalc(
        totalScoreOptionalTeam(id, matchs as [])[team],
        countMatchs(id, matchs as [])[team],
      ),
    }));

    return { code: 200, leaderboard: sortArr(leaderboard) };
  }
}
