const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');

const once = (callback) => {
  return callback;
};

describe('SmartCar Routes', () => {
  describe('#GET /vehicles/:id', () => {
    describe('Given an invalid id 4321', () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${4321}/`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql('Vehicle id: 4321 not found.');
            done();
          });
      });
    });

    describe('Given a valid id 1234', () => {
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

  describe('#GET /vehicles/:id/doors', () => {
    describe('Given an invalid id 4321', () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${4321}/`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql('Vehicle id: 4321 not found.');
            done();
          });
      });
    });

    describe('Given a valid id 1234', () => {
      it('Should return correct vehicle information', (done) => {
        request(app)
          .get(`/vehicles/${1234}/`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            const data = [
              {
                "location": "frontRight",
                "locked": "False"
              },
              {
                "location": "frontLeft",
                "locked": "False"
              },
              {
                "location": "backLeft",
                "locked": "False"
              },
              {
                "location": "backRight",
                "locked": "True"
              }
            ];

            expect(res.body).to.eql(data);
            done();
          });
      });
    });
  });
});

