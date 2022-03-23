import { Router } from 'express';
import { MatchController } from '../controllers';

export default class MatchRoute {
  public match: Router;

  private matchsController: MatchController;

  constructor() {
    this.match = Router();
    this.matchsController = new MatchController();
    this.routes();
  }

  private routes() {
    this.match.get(
      '/',
      this.matchsController.getMatchs,
    );
  }
}
