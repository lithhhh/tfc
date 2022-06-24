import { ILogin } from '../interfaces';
import User from '../../database/models/User';
import { jwt, compare, DomainError, statusCodes, StatusMessage } from '../utils';

export default class Login {
  constructor(
    private user = User,
  ) {}

  async login(login: ILogin) {
    const user = await this.user.findOne({
      where: { email: login.email },
      raw: true,
    });

    if (!user || !(await compare(login.password, user?.password as string))) {
      throw new DomainError(statusCodes.UNAUTHORIZED, StatusMessage.INCORRECT_CREDENTIALS);
    }

    const payloadUser = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      } };

    return { user: payloadUser.user, token: jwt.signToken(payloadUser.user) };
  }

  async validate(id: number) {
    const role = await this.user.findOne({
      where: { id },
      attributes: ['role'],
      raw: true,
    });

    return role;
  }
}
