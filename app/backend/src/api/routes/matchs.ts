import { MatchController } from '../../app/controllers';
import { Auth } from '../middlewares';
import Route from './abstract.route';

export default class MatchRoute extends Route<MatchController> {
  constructor(controller = new MatchController()) {
    super(controller);
  }

  routes() {
    this.route.get('/', this.controller.getMatchs);
    this.route.post('/', Auth.onlyAdminAuth, this.controller.createMatch);
    this.route.patch('/:id/finish', Auth.onlyAdminAuth, this.controller.patchMatchProgress);
    this.route.patch('/:id', Auth.onlyAdminAuth, this.controller.patchMatchScore);
  }
}
