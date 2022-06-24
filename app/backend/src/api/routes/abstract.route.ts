import { Router } from 'express';

export default abstract class Route<T> {
  public route: Router;

  constructor(protected controller: T) {
    this.route = Router();
    this.routes();
  }

  abstract routes(): void;
}
