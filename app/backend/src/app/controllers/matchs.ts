import { Request, Response } from 'express';
import { MatchsService } from '../services';
import { statusCodes, StatusMessage } from '../utils';

export default class MatchController {
  private service: MatchsService;

  constructor() {
    this.service = new MatchsService();

    this.getMatchs = this.getMatchs.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.patchMatchProgress = this.patchMatchProgress.bind(this);
    this.patchMatchScore = this.patchMatchScore.bind(this);
  }

  async getMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const matchsInProgress = await this.service.getMatchInProgress(inProgress === 'true');
      return res.status(statusCodes.OK).json(matchsInProgress);
    }

    const matchs = await this.service.getMatchs();
    return res.status(statusCodes.OK).json(matchs);
  }

  async createMatch(req: Request, res: Response) {
    const createdMatch = await this.service.createMatch(req.body);

    return res.status(statusCodes.CREATED).json(createdMatch);
  }

  async patchMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.patchProgress(Number(id));

    return res.status(statusCodes.OK).json({ message: StatusMessage.OK });
  }

  async patchMatchScore(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.patchScore(Number(id), req.body);

    return res.status(statusCodes.OK).json({ message: StatusMessage.OK });
  }
}
