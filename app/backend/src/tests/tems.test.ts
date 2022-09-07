// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import teams from './mock/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test endpoint GET/teams', () => {

  describe('In case of successful request', () => {
    
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
