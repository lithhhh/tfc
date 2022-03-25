import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  homeTeam: Joi.number().min(1).required(),
  awayTeam: Joi.number().min(1).required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
  inProgress: Joi.boolean(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({ message: error.message });
  }

  next();
};
