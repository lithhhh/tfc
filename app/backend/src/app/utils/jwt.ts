import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { readFileSync } from 'fs';
import { IJwtPayload } from '../interfaces';

const path = 'jwt.evaluation.key';

const SECRET_KEY = readFileSync(path, { encoding: 'utf8' });

const signToken = (payload: IJwtPayload) => sign(
  payload,
  SECRET_KEY,
  { algorithm: 'HS256', expiresIn: '7d' },
);

const verifyToken = (token: string) => verify(
  token,
  SECRET_KEY,
  { algorithms: ['HS256'] },
) as IJwtPayload;

export default {
  signToken,
  verifyToken,
};
