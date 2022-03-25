import loginValidation from './joi/login';
import tokenValidation from './joi/token';
import authToken from './jwt/validate';
import matchValidation from './joi/matchs';
import matchScoreValidation from './joi/matchScore';

export { loginValidation, tokenValidation, authToken, matchValidation, matchScoreValidation };
