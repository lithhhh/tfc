import * as Joi from 'joi';

const matchScoreSchema = Joi.object({
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
});

export default matchScoreSchema;
