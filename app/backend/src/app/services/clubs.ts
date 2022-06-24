import Clubs from '../../database/models/Club';
import { statusCodes, DomainError, StatusMessage } from '../utils';

export default class ClubsService {
  constructor(
    private clubs = Clubs,
  ) {}

  async clubsRequest() {
    return this.clubs.findAll();
  }

  async clubsRequestById(id: string) {
    const club = await this.clubs.findOne({
      where: { id },
      raw: true,
    });

    if (club === null) throw new DomainError(statusCodes.NOT_FOUND, StatusMessage.TEAM_NOT_FOUND);

    return club;
  }
}
