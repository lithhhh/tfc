import * as Joi from 'joi';

const message = 'Token not found';

const authorization = Joi.string().min(1).empty().required()
  .messages({
    'any.required': message,
    'string.empty': message,
    'string.min': message,
  });

export default authorization;
