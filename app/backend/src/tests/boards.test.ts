import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Team from '../database/models/teamModel';
import Match from '../database/models/matchModel';

import teams from './mock/teams';
import { finished } from './mock/matches';

import IMatch from '../typescript/interfaces/matchesInterface';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test endpoint GET/leaderboard/home', () => {

    describe('In case of successful request', () => {
  
      beforeEach(async () => {
        sinon
          .stub(Team, 'findAll')
          .resolves(teams as Team[]);
        sinon
          .stub(Match, 'findAll')
          .resolves(finished as IMatch[]);
      });
  
      afterEach(() => sinon.restore());
      
      it('Should return status 200', async () => {
          const response = await chai.request(app).get('/leaderboard/home');    
          expect(response.status).to.equal(200);
      });
  
      it('Should return an array with all home boards listed', async () => {
          const response = await chai.request(app).get('/leaderboard/home');

          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('object');
          expect(response.body[0]).to.have.property('name');
          expect(response.body[0]).to.have.property('totalPoints');
          expect(response.body[0]).to.have.property('totalGames');
          expect(response.body[0]).to.have.property('totalVictories');
          expect(response.body[0]).to.have.property('totalDraws');
          expect(response.body[0]).to.have.property('totalLosses');
          expect(response.body[0]).to.have.property('goalsFavor');
          expect(response.body[0]).to.have.property('goalsOwn');
          expect(response.body[0]).to.have.property('goalsBalance');
          expect(response.body[0]).to.have.property('efficiency');
      });
    });
  })