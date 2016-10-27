import sinon from 'sinon';
import proxyquire from 'proxyquire';
import req from 'supertest';
import request from 'request';
import { expect } from 'chai';

const TEST_ID = 1;
const TEST_ACTION = { action: 'foo' };

var gm;

describe('GM API', () => {
  var sandbox;

  before(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(request, 'post')
      .yields({
        status: 'foo',
        message: 'bar',
      });
    gm = proxyquire('../../lib/utils/GMApi', { request: request });
  });

  afterEach(() => {
    sandbox.restore();
  });
  
  describe('Given that the GM API errors', () => {
    describe('vehicleInfo', () => {
      it('Should error', (done) => {
        gm.vehicleInfo(TEST_ID, (err) => {
          expect(err.status).to.eql('foo');
          expect(err.message).to.eql('bar');
          done();
        });
      });
    });

    describe('vehicleSecurityStatus', () => {
      it('Should error', (done) => {
        gm.vehicleSecurityStatus(TEST_ID, (err) => {
          expect(err.status).to.eql('foo');
          expect(err.message).to.eql('bar');
          done();
        });
      });
    });

    describe('vehicleEnergy', () => {
      it('Should error', (done) => {
        gm.vehicleEnergy(TEST_ID, (err) => {
          expect(err.status).to.eql('foo');
          expect(err.message).to.eql('bar');
          done();
        });
      });
    });

    describe('vehicleEngine', () => {
      it('Should error', (done) => {
        gm.vehicleEngine(TEST_ID, TEST_ACTION, (err) => {
          expect(err.status).to.eql('foo');
          expect(err.message).to.eql('bar');
          done();
        });
      });
    });
  });
});
