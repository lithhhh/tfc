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
import { matchMock, createdMatch } from './mocks/matchs.mock';
import { IMatchWithScore } from '../interfaces'

chai.use(chaiHttp);

const { expect } = chai;

describe('testes de retorno da rota /matchs', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  describe('testa quando é feito uma requisição GET à rota /matchs', () => {
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

  describe('testa quando é feito uma requisição GET à rota /matchs/:id', () => {
    before(async () => {
      return sinon
        .stub(Match, 'findOne')
        .resolves(matchMock[0] as unknown as Match);
    });

    after(() => {
      (Match.findOne as sinon.SinonStub).restore();
    });

    it('espera status code igual a 200', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .get('/matchs/1');

      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('espera receber um body contendo um objeto e a partida com especificada', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .get('/matchs/1');

      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.equal(matchMock[0]);
    });
  });

  describe('testa respostas da rota /matchs?inProgress=true/false', () => {
    let bool = true;
    before(async () => {
      return sinon
        .stub(Match, 'findAll')
        .resolves(matchMock as []);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('testa se é retornado uma partida em progresso', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .get('/matchs')
      .query('inProgress=true');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[1]).to.be.deep.equal(matchMock[1]);
    });

    it('testa se é retornado uma partida que não está mais em progresso', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .get('/matchs')
      .query('inProgress=false');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[0]).to.be.deep.equal(matchMock[0]);
    });
  });

  describe('testa rota /match/:id/finish', () => {
    before(() => {
      return sinon.stub(Match, 'update').resolves(undefined);
    });

    after(() => (Match.update as sinon.SinonStub).restore());

    it('testa se é usado o método Patch', async () => {
      let chaiHttpResponse: Response = await chai
      .request(app)
      .patch('/matchs/1/finish');

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('testa rota /match (POST)', async () => {
    const login = 
    {
      "email": "admin@admin.com",
      "password":	"$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
    };

    const { body: { token } } = await chai
    .request(app)
    .post('/login')
    .send(login);

    describe('testa casos de erro', () => {
      before(() => {
        sinon.stub(Match, 'findAll').resolves([matchMock[0]] as unknown as []);
        sinon.stub(Match, 'create').resolves(createdMatch as unknown as Match);
      });
  
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
        (Match.create as sinon.SinonStub).restore();
      });
  
      it('testa se não é possível adicionar partida com times inexistentes', async () => {
        let { status, body }: Response = await chai
        .request(app)
        .post('/matchs')
        .set('Authorization', token)
        .send(
          {
            "homeTeam": 123913,
            "homeTeamGoals": 1,
            "awayTeam": 1298318,
            "awayTeamGoals": 4
          }
        );

        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('There is no team with such id!');
      });

      it('testa se não é possível adicionar partida com times iguais', async () => {
        let { status, body }: Response = await chai
        .request(app)
        .post('/matchs')
        .set('Authorization', token)
        .send(
          {
            "homeTeam": 1,
            "homeTeamGoals": 1,
            "awayTeam": 1,
            "awayTeamGoals": 4
          }
        );

        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('It is not possible to create a match with two equal teams');
      });
    });

    describe('testa caso de sucesso', () => {
      before(() => {
        sinon.stub(Match, 'findAll').resolves(matchMock as []);
        sinon.stub(Match, 'create').resolves(createdMatch as unknown as Match);
      });
  
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
        (Match.create as sinon.SinonStub).restore();
      });

      it('testa se é retornado o body/status esperados', async () => {
        let chaiHttpResponse: Response = await chai
        .request(app)
        .post('/matchs')
        .set('Authorization', token)
        .send(
          {
            "homeTeam": 1,
            "homeTeamGoals": 1,
            "awayTeam": 2,
            "awayTeamGoals": 4
          }
        );

        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal(createdMatch);
      })
    });
  });
});
