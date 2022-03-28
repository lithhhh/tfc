import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
    this.getLeaderboard = this.getLeaderboard.bind(this);
    this.getLeaderboardHome = this.getLeaderboardHome.bind(this);
    this.getLeaderboardAway = this.getLeaderboardAway.bind(this);
  }

  async getLeaderboard(_req: Request, res: Response) {
    const { code, leaderboard } = await this.service.getLeaderboard();

    return res.status(code).json(leaderboard);
  }

  async getLeaderboardHome(_req: Request, res: Response) {
    const { code, leaderboard } = await this.service.getLeaderboardAwayOrHome('home');

    return res.status(code).json(leaderboard);
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    const { code, leaderboard } = await this.service.getLeaderboardAwayOrHome('away');

    return res.status(code).json(leaderboard);
  }
}
