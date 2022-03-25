import Clubs from '../database/models/Club';

export default class ClubsService {
  constructor(
    private clubs = Clubs,
  ) {}

/*   async getLeaderboard() {
    const clubs = await this.clubs.findAll();
  } */
}
