import { Request, Response } from 'express';
import { MatchsService } from '../services';

export default class MatchController {
  private service: MatchsService;

  constructor() {
    this.service = new MatchsService();
    this.getMatchs = this.getMatchs.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.patchMatch = this.patchMatch.bind(this);
  }

  async getMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const { code, matchs } = await this.service.inProgressRequest(inProgress === 'true');
      return res.status(code).json(matchs);
    }

    const { code, matchs } = await this.service.matchRequest();
    return res.status(code).json(matchs);
  }

  async createMatch(req: Request, res: Response) {
    const { code, message } = await this.service.createMatch(req.body);

    return res.status(code).json(message);
  }

  async patchMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { code } = await this.service.patchProgress(Number(id));

    return res.status(code).end();
  }
}
