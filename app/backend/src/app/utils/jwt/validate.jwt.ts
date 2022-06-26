import { NextFunction, Response, Request } from 'express';
import { tokenSchema, validateInput } from '../joi';
import { DomainError, statusCodes, StatusMessage } from '..';
import jwt from './jwt';

export default {
  onlyAdminAuth: (req: Request, _res: Response, _next: NextFunction) => {
    const { authorization } = req.headers;

    validateInput(tokenSchema, authorization);

    const decoded = jwt.verifyToken(authorization as string);
    if (decoded.role !== 'admin') {
      throw new DomainError(statusCodes.UNAUTHORIZED, StatusMessage.UNAUTHORIZED);
    }
    req.id = decoded;

    _next();
  },

  Auth: (req: Request, _res: Response, _next: NextFunction) => {
    const { authorization } = req.headers;

    validateInput(tokenSchema, authorization);

    const decoded = jwt.verifyToken(authorization as string);

    req.id = decoded;

    _next();
  },
};
