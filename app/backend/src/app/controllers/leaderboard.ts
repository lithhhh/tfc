import { Request, Response } from 'express';
import { LeaderboardService } from '../services';
import { statusCodes } from '../utils';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
    this.getLeaderboard = this.getLeaderboard.bind(this);
    this.getLeaderboardHome = this.getLeaderboardHome.bind(this);
    this.getLeaderboardAway = this.getLeaderboardAway.bind(this);
  }

  async getLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.service.getLeaderboard();

    return res.status(statusCodes.OK).json(leaderboard);
  }

  async getLeaderboardHome(_req: Request, res: Response) {
    const leaderboard = await this.service.getLeaderboardAwayOrHome('home');

    return res.status(statusCodes.OK).json(leaderboard);
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    const leaderboard = await this.service.getLeaderboardAwayOrHome('away');

    return res.status(statusCodes.OK).json(leaderboard);
  }
}
