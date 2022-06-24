import { Router } from 'express';
import { ClubsController } from '../../app/controllers';

export default class ClubsRoute {
  public clubs: Router;

  private clubsControler: ClubsController;

  constructor() {
    this.clubs = Router();
    this.clubsControler = new ClubsController();
    this.routes();
  }

  private routes() {
    this.clubs.get(
      '/',
      this.clubsControler.getClubs,
    );

    this.clubs.get(
      '/:id',
      this.clubsControler.getClubsById,
    );
  }
}
