import ClubsService from './clubs';
import MatchsService from './matchs';
import { LeaderboardCreator } from '../utils';

export default class LeaderboardService {
  constructor(
    private match = new MatchsService(),
    private clubs = new ClubsService(),
    private Leaderboard = new LeaderboardCreator(),
  ) {}

  async getLeaderboard() {
    const clubs = await this.clubs.clubsRequest();
    const matchs = await this.match.inProgressRequest(false);

    return this.Leaderboard.leaderboard(clubs, matchs as []);
  }

  async getLeaderboardAwayOrHome(team: 'away' | 'home') {
    const clubs = await this.clubs.clubsRequest();
    const matchs = await this.match.inProgressRequest(false);

    return this.Leaderboard.leaderboardOptional(clubs, matchs as [], team);
  }
}
