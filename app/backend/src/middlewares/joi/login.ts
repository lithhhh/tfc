import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const message = 'All fields must be filled'; // temporário

const schema = Joi.object({
  email: Joi.string().empty().required().messages({
    'any.required': message,
    'string.empty': message,
  }),
  password: Joi.string().empty().required().messages({
    'any.required': message,
    'string.empty': message,
  }),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.message.includes('filled')) return res.status(401).json({ message: error.message });
    return res.status(422).json({ message: error.message });
  }

  next();
};
