import * as express from 'express';
import 'express-async-errors';
import { ClubsRoute, LoginRoute, MatchRoute, LeaderboardRoute } from './routes';
import { errorHandler } from './middlewares';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandler();
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
  }

  private routes():void {
    this.app.use('/login', new LoginRoute().login);
    this.app.use('/clubs', new ClubsRoute().clubs);
    this.app.use('/matchs', new MatchRoute().match);
    this.app.use('/leaderboard', new LeaderboardRoute().leaderboard);
  }

  private errorHandler(): void {
    this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`executando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
