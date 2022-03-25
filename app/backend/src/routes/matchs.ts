import { Router } from 'express';
import { MatchController } from '../controllers';
import { matchValidation, authToken } from '../middlewares';

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

    this.match.post(
      '/',
      authToken,
      matchValidation,
      this.matchsController.createMatch,
    );

    this.match.patch(
      '/:id/finish',
      this.matchsController.patchMatchProgress,
    );

    this.match.patch(
      '/:id',
      this.matchsController.patchMatchScore,
    );
  }
}
