import { ILogin } from '../interfaces';
import User from '../database/models/User';
import { jwt, /* hash, */ compare } from '../utils';

export default class Login {
  constructor(
    private user = User,
  ) {}

  async login(login: ILogin) {
    const user = await this.user.findOne({
      where: { email: login.email },
      raw: true,
    });

    const comparation = await compare(login.password, user?.password as string);

    if (!user || !comparation) return { message: 'Incorrect email or password', code: 401 };

    const payloadUser = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      } };

    const token = jwt.signToken(payloadUser.user);

    return {
      code: 200,
      payload: { user: payloadUser.user, token },
    };
  }

  async validate(id: number) {
    const role = await this.user.findOne({
      where: { id },
      attributes: ['role'],
      raw: true,
    });

    return { code: 200, role: role?.role };
  }
}
