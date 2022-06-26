import Match from '../../database/models/Match';
import Clubs from '../../database/models/Club';
import { IMatch, IScore } from '../interfaces';
import { DomainError, statusCodes, StatusMessage } from '../utils';

export default class MatchsService {
  constructor(
    private matchs = Match,
    private clubs = Clubs,
  ) {}

  // pense em como você pode unir os métodos abaixo (inProgressRequest e matchRequest);
  // ps: sem que o Lint reclame...

  async getMatchInProgress(inProgress: boolean) {
    return this.matchs
      .findAll(
        {
          where: { inProgress },
          include: [
            { model: this.clubs, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubs, as: 'awayClub', attributes: ['clubName'] },
          ] },
      );
  }

  async getMatchs() {
    return this.matchs
      .findAll(
        {
          include: [
            { model: this.clubs, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubs, as: 'awayClub', attributes: ['clubName'] },
          ] },
      );
  }

  async createMatch(body: IMatch) {
    if (body.awayTeam === body.homeTeam) {
      throw new DomainError(statusCodes.BAD_REQUEST, StatusMessage.EQUAL_TEAMS);
    }

    const teams = await this.clubs.findAll({
      where: { id: [body.awayTeam, body.homeTeam] },
      raw: true,
    });

    if (teams.length < 2) {
      throw new DomainError(statusCodes.BAD_REQUEST, StatusMessage.TEAM_NOT_FOUND);
    }

    return this.matchs.create(body);
  }

  async patchProgress(id: number) {
    return this.matchs.update({ inProgress: false }, { where: { id } });
  }

  async patchScore(id: number, body: IScore) {
    return this.matchs.update(body, { where: { id } });
  }
}
