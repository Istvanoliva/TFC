import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Match from '../database/models/matchModel';
import User from '../database/models/userModel';

import IMatch from '../typescript/interfaces/matchesInterface';

import { matchesMock, inProgress, finished, newMatch, createdMatch } from './mock/matches';
import { userReq, userRes } from './mock/users';

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
        const response = await chai.request(app).get('/matches');
        expect(response.status).to.equal(200);
    });

    it('Should return an array with all matches listed', async () => {
        const response = await chai.request(app).get('/matches');
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

describe('Test endpoint POST /matches', () => {

  describe('In case of successful request', async () => {

    beforeEach(async () => {

      sinon
      .stub(User, 'findOne')
      .resolves(userRes as User)

      sinon
      .stub(Match, 'create')
      .resolves(createdMatch as Match)
    });

    afterEach(() => sinon.restore());

    it('Should return status 201', async () => {
      
      const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send({
        email: userReq.email,
        password: userReq.password,
      });

      const response = await chai.request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(newMatch);

      expect(response.status).to.equal(201);
    });

    it('Should return an object with match data', async () => {

      const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send({
        email: userReq.email,
        password: userReq.password,
      });

      const response = await chai.request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(newMatch);

      expect(response.body).to.be.deep.equal(createdMatch);
    });
  })
})

describe('Test endpoint PATCH /matches/:id/finish', () => {

  describe('In case of successful request', async () => {

    beforeEach(async () => {

      sinon
      .stub(User, 'findOne')
      .resolves(userRes as User)

      sinon
      .stub(Match, 'update')
      .resolves([1, []])
    });

    afterEach(() => sinon.restore());

    it('Should return status 200', async () => {
      
      const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send({
        email: userReq.email,
        password: userReq.password,
      });

      const response = await chai
        .request(app)
        .patch('/matches/41/finish')
        .set('Authorization', token)

      expect(response.status).to.equal(200);
    });

    it('Should return a message "Finished"', async () => {
      
      const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send({
        email: userReq.email,
        password: userReq.password,
      });

      const response = await chai
        .request(app)
        .patch('/matches/41/finish')
        .set('Authorization', token)

      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });
});