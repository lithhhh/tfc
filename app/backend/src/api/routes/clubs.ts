import { ClubsController } from '../../app/controllers';
import Route from './abstract.route';

export default class ClubsRoute extends Route<ClubsController> {
  constructor(controller = new ClubsController()) {
    super(controller);
  }

  routes() {
    this.route.get(
      '/',
      this.controller.getClubs,
    );

    this.route.get(
      '/:id',
      this.controller.getClubsById,
    );
  }
}
