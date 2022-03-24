import Clubs from '../database/models/Club';

export default class ClubsService {
  constructor(
    private clubs = Clubs,
  ) {}

  async clubsRequest() {
    const clubs = await this.clubs.findAll();

    return { code: 200, clubs };
  }

  async clubsRequestById(id: string) {
    const club = await this.clubs.findOne({
      where: { id },
      raw: true,
    });

    if (club === null) return { message: 'Club not found', code: 404 };

    return { code: 200, message: club };
  }
}
