import * as Joi from 'joi';

const matchSchema = Joi.object({
  homeTeam: Joi.number().min(1).required(),
  awayTeam: Joi.number().min(1).required(),
  /*   homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(), */
  inProgress: Joi.boolean(),
});

export default matchSchema;
