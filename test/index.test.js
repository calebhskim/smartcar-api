const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const once = (callback) => {
  return callback;
};

describe('SmartCar Routes', () => {
  describe('#GET /', () => {
    it('Should return status 200', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('#GET /vehicles/:id', () => {
    describe('Given id 1234', () => {
      it('Should return correct vehicle information', (done) => {
        request(app)
          .get(`/vehicles/${1234}/`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            const { vin, color, doorCount, driveTrain } = res.body;
            expect(vin).to.eql('123123412412');
            expect(color).to.eql('Metallic Silver');
            expect(doorCount).to.eql(4);
            expect(driveTrain).to.eql('v8');
            done();
          });
      });
    });
  });

  describe('Hello', () => {
    describe('#World', () => {
      it('should be true', () => {
        expect(true).to.eql(true);
      });
    });
    describe('stuff', () => {
      it("returns the return value from the original function", () => {
        var callback = sinon.stub().returns(42);
        var proxy = once(callback);
        expect(proxy()).to.eql(42);
      });
    });
  });
});

