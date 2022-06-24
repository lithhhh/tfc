import { Router } from 'express';
import { MatchController } from '../../app/controllers';
import { Auth } from '../middlewares';

export default class MatchRoute {
  public match: Router;

  private matchsController: MatchController;

  constructor() {
    this.match = Router();
    this.matchsController = new MatchController();
    this.routes();
  }

  private routes() {
    this.match.get('/', this.matchsController.getMatchs);

    this.match.post('/', Auth.onlyAdminAuth, this.matchsController.createMatch);

    this.match.patch('/:id/finish', Auth.onlyAdminAuth, this.matchsController.patchMatchProgress);

    this.match.patch('/:id', Auth.onlyAdminAuth, this.matchsController.patchMatchScore);
  }
}
