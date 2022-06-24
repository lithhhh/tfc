import { Request, Response } from 'express';
import { IId } from '../interfaces';
import { Login } from '../services';
import { loginSchema, validateInput } from '../../api/middlewares/joi';
import { statusCodes } from '../utils';

export default class LoginController {
  private service: Login;

  constructor() {
    this.service = new Login();
    this.login = this.login.bind(this);
    this.loginValidate = this.loginValidate.bind(this);
  }

  async login(req: Request, res: Response) {
    validateInput(loginSchema, req.body);
    const payload = await this.service.login(req.body);

    return res.status(statusCodes.OK).json(payload);
  }

  async loginValidate(req: Request, res: Response) {
    const { id } = req.id as IId;

    const role = await this.service.validate(id);

    return res.status(statusCodes.OK).json(role);
  }
}
