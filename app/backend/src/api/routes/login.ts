import { Router } from 'express';
import { Auth } from '../middlewares';
import { LoginController } from '../../app/controllers';

export default class LoginRoute {
  public login: Router; // public para declarar no app.ts

  private loginController: LoginController;

  constructor() {
    this.login = Router(); // minha rota
    this.loginController = new LoginController(); // instanciação do controller
    this.routes(); // declarando o método
  }

  private routes(): void {
    this.login.post(
      '/',
      this.loginController.login,
    );

    this.login.get(
      '/validate',
      Auth.Auth,
      this.loginController.loginValidate,
    );
  }
}
