import * as express from 'express';
import { ClubsRoute, LoginRoute, MatchRoute } from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', new LoginRoute().login);
    this.app.use('/clubs', new ClubsRoute().clubs);
    this.app.use('/matchs', new MatchRoute().match);
    // falta implementar handlers de erro
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`executando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
