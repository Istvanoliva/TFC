import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Match from '../database/models/matchModel';
import IMatch from '../typescript/interfaces/matchesInterface';
import { matchesMock } from './mock/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test endpoint GET/matches', () => {

  describe('In case of successful request', () => {

    beforeEach(async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesMock as IMatch[])
    });

    afterEach(() => sinon.restore());
    
    it('Should return status 200', async () => {
        const response = await chai.request(app).get('/matches').send();
        expect(response.status).to.equal(200);
    });

    it('Should return an array with all matches listed', async () => {
        const response = await chai.request(app).get('/matches').send();
        expect(response.body).to.be.deep.equal(matchesMock);
    });
  });
})