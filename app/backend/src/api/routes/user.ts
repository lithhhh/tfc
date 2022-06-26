import { Auth } from '../../app/utils/jwt';
import { LoginController } from '../../app/controllers';
import Route from './abstract.route';

export default class LoginRoute extends Route<LoginController> {
  constructor(controller = new LoginController()) {
    super(controller);
  }

  routes(): void {
    this.route.post('/login', this.controller.login);

    this.route.get('/login/validate', Auth.Auth, this.controller.loginValidate);

    this.route.post('/signup', this.controller.newUser);
  }
}
