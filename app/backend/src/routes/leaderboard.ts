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
    this.leaderboard.get('/', this.leaderboardController.getLeaderboard);
    this.leaderboard.get('/home', this.leaderboardController.getLeaderboardHome);
    this.leaderboard.get('/away', this.leaderboardController.getLeaderboardAway);
  }
}
