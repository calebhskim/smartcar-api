import sinon from 'sinon';
import request from 'supertest';
import { expect } from 'chai';
import app from '../lib/app';

describe('Application Routes', () => {
  describe('#GET invalid route', () => {
    it('Should return status 404', (done) => {
      request(app)
        .get('/invalid')
        .expect(404, done);
    });
  });

  describe('#GET /', () => {
    it('Should return status 200', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
});
