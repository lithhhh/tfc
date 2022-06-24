import Match from '../../database/models/Match';
import Clubs from '../../database/models/Club';
import { IMatch, IScore } from '../interfaces';

export default class MatchsService {
  constructor(
    private matchs = Match,
    private clubs = Clubs,
  ) {}

  // pense em como você pode unir os métodos abaixo (inProgressRequest e matchRequest);
  // ps: sem que o Lint reclame...

  async inProgressRequest(inProgress: boolean) {
    const matchs = await this.matchs
      .findAll(
        {
          where: { inProgress },
          include: [
            { model: this.clubs, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubs, as: 'awayClub', attributes: ['clubName'] },
          ] },
      );
    return { matchs, code: 200 };
  }

  async matchRequest() {
    const matchs = await this.matchs
      .findAll(
        {
          include: [
            { model: this.clubs, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubs, as: 'awayClub', attributes: ['clubName'] },
          ] },
      );
    return { matchs, code: 200 };
  }

  async createMatch(body: IMatch) {
    if (body.awayTeam === body.homeTeam) {
      return {
        message: { message: 'It is not possible to create a match with two equal teams' },
        code: 401,
      };
    }

    const teams = await this.clubs.findAll({
      where: { id: [body.awayTeam, body.homeTeam] },
      raw: true,
    });

    if (teams.length < 2) {
      return { message: { message: 'There is no team with such id!' }, code: 401 };
    }

    return { code: 201, message: await this.matchs.create(body) };
  }

  async patchProgress(id: number) {
    await this.matchs.update({ inProgress: false }, { where: { id } });

    return { code: 200, message: 'ok' };
  }

  async patchScore(id: number, body: IScore) {
    await this.matchs.update(body, { where: { id } });

    return { code: 200, message: 'ok' };
  }
}
