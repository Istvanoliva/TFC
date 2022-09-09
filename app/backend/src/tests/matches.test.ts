import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Match from '../database/models/matchModel';
import IMatch from '../typescript/interfaces/matchesInterface';
import { matchesMock, inProgress, finished } from './mock/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test endpoint GET /matches', () => {

  describe('In case of successful request', () => {

    before(async () => {
      const stubResolve = sinon.stub(Match, 'findAll');

      stubResolve.onCall(0).resolves(matchesMock as IMatch[])
      stubResolve.onCall(1).resolves(matchesMock as IMatch[])
      stubResolve.onCall(2).resolves(inProgress as IMatch[]);
      stubResolve.onCall(3).resolves(finished as IMatch[]);
    });

    after(() => sinon.restore());
    
    it('Should return status 200', async () => {
        const response = await chai.request(app).get('/matches').send();
        expect(response.status).to.equal(200);
    });

    it('Should return an array with all matches listed', async () => {
        const response = await chai.request(app).get('/matches').send();
        expect(response.body).to.be.deep.equal(matchesMock);
    });

    it('When search by "in progress" matches', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.body).to.be.deep.equal(inProgress);
    });

    it('When search by "finished" matches', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');
      expect(response.body).to.be.deep.equal(finished);
    });
  });
})