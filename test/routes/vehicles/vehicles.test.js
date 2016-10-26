const sinon = require('sinon');
const request = require('supertest');
const chai = require('chai');
const app = require('../../../app');

const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

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
          .get(`/vehicles/${4321}/doors`)
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
          .get(`/vehicles/${1234}/doors`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            res.body.should.all.have.property('location');
            res.body.should.all.have.property('locked');
            done();
          });
      });
    });
  });

  describe('#GET /vehicles/:id/fuel', () => {
    describe('Given an invalid id 4321', () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${4321}/fuel`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql('Vehicle id: 4321 not found.');
            done();
          });
      });
    });

    describe('Given a valid id 1235 that does not have fuel', () => {
      it('Should return 400 with appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${1235}/fuel`)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            
            const { message } = res.body;
            expect(message).to.eql('Vehicle with id 1235 does not have fuel.');
            done();
          });
      });
    });

    describe('Given a valid id 1234', () => {
      it('Should return correct vehicle fuel information', (done) => {
        request(app)
          .get(`/vehicles/${1234}/fuel`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            const { percentage } = res.body;
            expect(isNaN(parseFloat(percentage))).to.be.false;
            done();
          });
      });
    });
  });

  describe('#GET /vehicles/:id/battery', () => {
    describe('Given an invalid id 4321', () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${4321}/battery`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql('Vehicle id: 4321 not found.');
            done();
          });
      });
    });

    describe('Given a valid id 1234 that does not have battery', () => {
      it('Should return 400 with appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${1234}/battery`)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            
            const { message } = res.body;
            expect(message).to.eql('Vehicle with id 1234 does not have a battery.');
            done();
          });
      });
    });

    describe('Given a valid id 1235', () => {
      it('Should return correct vehicle battery information', (done) => {
        request(app)
          .get(`/vehicles/${1235}/battery`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            const { percentage } = res.body;
            expect(isNaN(parseFloat(percentage))).to.be.false;
            done();
          });
      });
    });
  });
});

