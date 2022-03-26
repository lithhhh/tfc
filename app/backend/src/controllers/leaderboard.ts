import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
    this.getLeaderboard = this.getLeaderboard.bind(this);
  }

  async getLeaderboard(_req: Request, res: Response) {
    const { code, leaderboard } = await this.service.getLeaderboard();

    return res.status(code).json(leaderboard);
  }
}
