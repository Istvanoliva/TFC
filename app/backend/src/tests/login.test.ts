import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import { userReq, userRes } from './mock/users';
import User from '../database/models/userModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test endpoint POST/login', () => {

  describe('In case of successful request', () => {

    beforeEach(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userRes as User)
    });

    afterEach(() => sinon.restore());

    it('Should return status 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: userReq.email,
        password: userReq.password,
      });

      expect(response.status).to.equal(200);
    });

    it('Should return a token', async () => {
      const response = await chai.request(app).post('/login').send({
        email: userReq.email,
        password: userReq.password,
      });

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
    });
  })
});

describe('Test endpoint GET/login/validate', () => {

  describe('In case of successful request', () => {

    it('Should return 200', async () => {

      const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send(userReq);

      const response = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', token)
      
      expect(response.status).to.equal(200);
    });
  });
});