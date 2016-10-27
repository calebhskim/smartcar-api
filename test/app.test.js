const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

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
