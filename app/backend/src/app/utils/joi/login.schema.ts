import * as Joi from 'joi';

const message = 'All fields must be filled'; // temporário

const loginSchema = Joi.object({
  email: Joi.string().empty().required().messages({
    'any.required': message,
    'string.empty': message,
  }),
  password: Joi.string().empty().required().messages({
    'any.required': message,
    'string.empty': message,
  }),
});

export default loginSchema;
