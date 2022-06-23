import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import { DomainError, statusCodes, StatusMessage } from '../../app/utils';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log(err);
  if (joi.isError(err)) {
    const { message } = err.details[0];
    if (message.includes('filled')) return res.status(401).json({ message });
    return res.status(422).json({ message });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  if (DomainError.isDomainError(err)) return res.status(err.code).json({ message: err.message });

  return res.status(statusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
}
