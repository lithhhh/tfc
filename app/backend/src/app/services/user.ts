import { ILogin, IRegister } from '../interfaces';
import User from '../../database/models/User';
import { compare, DomainError, statusCodes, StatusMessage, hash } from '../utils';
import { jwt } from '../utils/jwt';

export default class Login {
  constructor(
    private user = User,
  ) {}

  async login(login: ILogin) {
    const findUser = await this.user.findOne({
      where: { email: login.email },
      raw: true,
    });

    if (!findUser || !(await compare(login.password, findUser?.password as string))) {
      throw new DomainError(statusCodes.UNAUTHORIZED, StatusMessage.INCORRECT_CREDENTIALS);
    }

    const user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
      email: findUser.email,
    };

    return { user, token: jwt.signToken(user) };
  }

  async validate(id: number) {
    const role = await this.user.findOne({
      where: { id },
      attributes: ['role'],
      raw: true,
    });

    return role;
  }

  async newUser(body: IRegister) {
    const findEmail = await this.user.findOne({ where: { email: body.email }, raw: true });

    if (findEmail) throw new DomainError(statusCodes.CONFLICT, StatusMessage.ALREADY_EXISTS);

    const { username, email, id, role } = await this.user.create({
      username: body.username,
      password: await hash(body.password),
      email: body.email,
    }, { raw: true });

    const token = jwt.signToken({ username, email, id, role });

    return { username, role, id, token };
  }
}
