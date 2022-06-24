import { IId } from '../app/interfaces';
// para termos o acesso à criação de variáveis no Request
// ref: https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
// 'express-serve-static-core': interface aberta para extensões
declare module 'express-serve-static-core' {
  interface Request {
    id?: IId
  }
}
