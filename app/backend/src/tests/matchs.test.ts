import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
/* 
  ** para andamento dos testes, foi necessário utilizar a flag "--file" para rodar o ts-node aceitando as modificações dos types
  ** além da adição de "TS_NODE_FILES=true" no script de tests
  ** referência: https://stackoverflow.com/questions/53765895/how-to-extend-express-request-type-in-a-ts-node-project
*/
import { Response } from 'superagent';
import matchMock from './mocks/matchs.mock';
import { IMatch } from '../interfaces'

chai.use(chaiHttp);

const { expect } = chai;

describe('testes de retorno da rota /matchs', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  describe('testa quando é feito uma requisição correta', () => {
    before(async () => {
      return sinon
        .stub(Match, 'findAll')
        .resolves(matchMock as []);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('testa se retorna os status corretos', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .get('/matchs');

      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('testa se retorna o body esperado', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .get('/matchs');

      expect(chaiHttpResponse.body).to.be.deep.equal(matchMock);
    });

  });
});
