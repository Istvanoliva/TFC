// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import { userReq } from './mock/users';

chai.use(chaiHttp);

const { expect } = chai;

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