import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/teamModel';

import teams from './mock/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test endpoint GET/teams', () => {

  describe('In case of successful request', () => {

    beforeEach(async () => {
      sinon
        .stub(Team, 'findByPk')
        .resolves(teams as unknown as Team)
    });

    afterEach(() => sinon.restore());
    
    it('Should return status 200', async () => {
        const response = await chai.request(app).get('/teams').send();    
        expect(response.status).to.equal(200);
    });

    it('Should return an array with all clubs listed', async () => {
        const response = await chai.request(app).get('/teams').send();
        expect(response.body).to.be.deep.equal(teams);
    });
  });
})

describe('Test endpoint GET/teams/:id', () => {
  
  describe('In case of sucessful request', () => {

    beforeEach(async () => {
      sinon
        .stub(Team, 'findByPk')
        .resolves(teams[0] as Team)
    });

    afterEach(() => sinon.restore());

    it('Should return status 200', async () => {
        const response = await chai.request(app).get('/teams/:id').send();    
        expect(response.status).to.equal(200);
    });

    it('Should return the club whose id is the same as the past', async () => {
        const id = 1;
        const response = await chai.request(app).get(`/teams/:${id}`).send();    
        expect(response.body).to.be.deep.equal(teams[0]);
    });
  });
});