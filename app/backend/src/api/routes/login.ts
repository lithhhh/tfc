import { Auth } from '../middlewares';
import { LoginController } from '../../app/controllers';
import Route from './abstract.route';

export default class LoginRoute extends Route<LoginController> {
  constructor(controller = new LoginController()) {
    super(controller);
  }

  routes(): void {
    this.route.post('/', this.controller.login);

    this.route.get('/validate', Auth.Auth, this.controller.loginValidate);
  }
}
