import { Router } from 'express';
import { LeaderboardController } from '../controllers';

export default class LeaderboardRoute {
  public leaderboard: Router;

  private leaderboardController: LeaderboardController;

  constructor() {
    this.leaderboard = Router();
    this.leaderboardController = new LeaderboardController();
    this.routes();
  }

  private routes(): void {
    this.leaderboard.get('/home', this.leaderboardController.getLeaderboard);
  }
}
