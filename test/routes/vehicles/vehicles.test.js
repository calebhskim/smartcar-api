import sinon from 'sinon';
import request from 'supertest';
import chai, { expect } from 'chai';
import chaiThings from 'chai-things';
import app from '../../../lib/app';

chai.should();
chai.use(chaiThings);

const BAD_ID = 4321;
const GOOD_ID_1 = 1234;
const GOOD_ID_2 = 1235;

describe('SmartCar Routes', () => {
  describe('#GET /vehicles/:id', () => {
    describe(`Given an invalid id ${BAD_ID}`, () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${BAD_ID}/`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql(`Vehicle id: ${BAD_ID} not found.`);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1}`, () => {
      it('Should return correct vehicle information', (done) => {
        request(app)
          .get(`/vehicles/${GOOD_ID_1}/`)
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
    describe(`Given an invalid id ${BAD_ID}`, () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${BAD_ID}/doors`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql(`Vehicle id: ${BAD_ID} not found.`);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1}`, () => {
      it('Should return correct vehicle information', (done) => {
        request(app)
          .get(`/vehicles/${GOOD_ID_1}/doors`)
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
    describe(`Given an invalid id ${BAD_ID}`, () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${BAD_ID}/fuel`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql(`Vehicle id: ${BAD_ID} not found.`);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_2} that does not have fuel`, () => {
      it('Should return 404 with appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${GOOD_ID_2}/fuel`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            
            const { message } = res.body;
            expect(message).to.eql(`Vehicle with id ${GOOD_ID_2} does not have fuel.`);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1}`, () => {
      it('Should return correct vehicle fuel information', (done) => {
        request(app)
          .get(`/vehicles/${GOOD_ID_1}/fuel`)
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
    describe(`Given an invalid id ${BAD_ID}`, () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${BAD_ID}/battery`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql(`Vehicle id: ${BAD_ID} not found.`);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1} that does not have battery`, () => {
      it('Should return 404 with appropriate message', (done) => {
        request(app)
          .get(`/vehicles/${GOOD_ID_1}/battery`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            
            const { message } = res.body;
            expect(message).to.eql(`Vehicle with id ${GOOD_ID_1} does not have a battery.`);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_2}`, () => {
      it('Should return correct vehicle battery information', (done) => {
        request(app)
          .get(`/vehicles/${GOOD_ID_2}/battery`)
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

  describe('#POST /vehicles/:id/engine', () => {
    describe(`Given a request with a non application/json content-type header`, () => {
      it('Should error with a 400 and appropriate message', (done) => {
        request(app)
          .post(`/vehicles/${BAD_ID}/engine`)
          .set('content-type', 'text/html')
          .send("action")
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.eql('Content-Type header must be present and have value "application/json"');
            done();
          });
      });
    });

    describe(`Given an invalid id ${BAD_ID}`, () => {
      it('Should error with a 404 and appropriate message', (done) => {
        request(app)
          .post(`/vehicles/${BAD_ID}/engine`)
          .set('content-type', 'application/json')
          .send({
            "action": "START"
          })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            
            const { message } = res.body;
            expect(message).to.eql(`Vehicle id: ${BAD_ID} not found.`);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1}`, () => {
      it('Should return correct vehicle engine status', (done) => {
        request(app)
          .post(`/vehicles/${GOOD_ID_1}/engine`)
          .set('content-type', 'application/json')
          .send({
            "action": "START"
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            const { status } = res.body;
            expect(['success', 'error']).to.be.include(status);
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1} and no action`, () => {
      it('Should error with 400', (done) => {
        request(app)
          .post(`/vehicles/${GOOD_ID_1}/engine`)
          .set('content-type', 'application/json')
          .send({
            "blob": "START"
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.be.eql('Invalid or no action sent.');
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1} and invalid action`, () => {
      it('Should error with 400', (done) => {
        request(app)
          .post(`/vehicles/${GOOD_ID_1}/engine`)
          .set('content-type', 'application/json')
          .send({
            "action": "HELP"
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.be.eql('Invalid action HELP is not one of START | STOP.');
            done();
          });
      });
    });

    describe(`Given a valid id ${GOOD_ID_1} and invalid body`, () => {
      it('Should error with 400', (done) => {
        request(app)
          .post(`/vehicles/${GOOD_ID_1}/engine`)
          .set('content-type', 'application/json')
          .send('bad')
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);

            const { message } = res.body;
            expect(message).to.be.eql('Invalid body.');
            done();
          });
      });
    });
  });
});

