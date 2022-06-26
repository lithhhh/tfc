import * as Joi from 'joi';

const signupSchema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

export default signupSchema;
