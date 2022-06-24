import { LeaderboardController } from '../../app/controllers';
import Route from './abstract.route';

export default class LeaderboardRoute extends Route<LeaderboardController> {
  constructor(controller = new LeaderboardController()) {
    super(controller);
  }

  routes(): void {
    this.route.get('/', this.controller.getLeaderboard);
    this.route.get('/home', this.controller.getLeaderboardHome);
    this.route.get('/away', this.controller.getLeaderboardAway);
  }
}
