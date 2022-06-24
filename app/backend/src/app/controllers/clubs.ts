import { Request, Response } from 'express';
import { ClubsService } from '../services';
import { statusCodes } from '../utils';

export default class ClubsController {
  private service: ClubsService;

  constructor() {
    this.service = new ClubsService();
    this.getClubs = this.getClubs.bind(this);
    this.getClubsById = this.getClubsById.bind(this);
  }

  async getClubs(req: Request, res: Response) {
    const clubs = await this.service.clubsRequest();

    return res.status(statusCodes.OK).json(clubs);
  }

  async getClubsById(req: Request, res: Response) {
    const { id } = req.params;
    const club = await this.service.clubsRequestById(id);

    return res.status(statusCodes.OK).json(club);
  }
}
