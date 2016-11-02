import chai, { expect } from 'chai';
import spies from 'chai-spies';
import proxyquire from 'proxyquire';

proxyquire.noCallThru();
chai.use(spies);

describe('SmartCar API', () => {
  describe('Given the GM API promise resolves', () => {
    describe('Given the response does not have a status of 200', () => {
      let smartCarApi;
      const promise = Promise.resolve({
        data: {
          status: '123',
          reason: 'foo',
        }      
      });

      before(() => {
        smartCarApi = proxyquire('../../lib/utils/SmartCarApi', {
          './GMApi': {
            vehicleInfo: id => promise,
            vehicleSecurityStatus: id => promise,
            vehicleEnergy: id => promise,
            vehicleEngine: (id, action) => promise,
          },
        }).default;
      });

      describe('vehicleInfo', () => {
        it('Should reject with an error', () => {
          return smartCarApi.vehicleInfo(123).catch((err) => {
            const { status, message } = err;

            expect(status).to.eql('123');
            expect(message).to.eql('foo');
          }); 
        }); 
      });

      describe('security', () => {
        it('Should reject with an error', () => {
          return smartCarApi.security(123).catch((err) => {
            const { status, message } = err;

            expect(status).to.eql('123');
            expect(message).to.eql('foo');
          }); 
        }); 
      });

      describe('energy', () => {
        it('Should reject with an error', () => {
          return smartCarApi.energy(123).catch((err) => {
            const { status, message } = err;

            expect(status).to.eql('123');
            expect(message).to.eql('foo');
          }); 
        }); 
      });

      describe('engine', () => {
        it('Should reject with an error', () => {
          return smartCarApi.engine(123).catch((err) => {
            const { status, message } = err;

            expect(status).to.eql('123');
            expect(message).to.eql('foo');
          }); 
        }); 
      });
    });

    describe('Given the response does have a status of 200', () => {
      let smartCarApi;
      let resData;

      const promise = Promise.resolve({
        data: {
          status: '200',
          data: {
            vin: { value: 1 },
            color: { value: 2 },
            fourDoorSedan: { value: true },
            driveTrain: { value: 5 },
            doors: { values: [] },
            tankLevel: { value: 6 },
            batteryLevel: { value: 7 },
          },
          actionResult: { status: 'EXECUTED' },
        }      
      });

      beforeEach(() => {
        smartCarApi = proxyquire('../../lib/utils/SmartCarApi', {
          './GMApi': {
            vehicleInfo: id => promise,
            vehicleSecurityStatus: id => promise,
            vehicleEnergy: id => promise,
            vehicleEngine: (id, action) => promise,
          },
        }).default;
      });

      describe('vehicleInfo', () => {
        it('Should return correct data', () => {
          return smartCarApi.vehicleInfo(123).then((res) => {
            const { status, data: { vin, color, doorCount, driveTrain } } = res;

            expect(status).to.eql('200');
            expect(vin).to.eql(1);
            expect(color).to.eql(2);
            expect(doorCount).to.eql(4);
            expect(driveTrain).to.eql(5);
          }); 
        }); 
      });

      describe('security', () => {
        it('Should return correct data', () => {
          return smartCarApi.security(123).then((res) => {
            const { status, data } = res;

            expect(status).to.eql('200');
            expect(data).to.eql([]);
          }); 
        }); 
      });

      describe('energy', () => {
        it('Should return correct data', () => {
          return smartCarApi.energy(123).then((res) => {
            const { status, data: { tank, battery } } = res;

            expect(status).to.eql('200');
            expect(tank.percentage).to.eql(6);
            expect(battery.percentage).to.eql(7);
          }); 
        }); 
      });

      describe('engine', () => {
        it('Should return correct data', () => {
          return smartCarApi.engine(123, 'foo').then((res) => {
            const { status, data } = res;

            expect(status).to.eql('200');
            expect(data.status).to.eql('success');
          }); 
        }); 
      });
    });
  });

  describe('Given the GM API promise rejects', () => {
    let smartCarApi;
    let resData;

    const promise = Promise.reject({
      status: 42,
      message: 'foo',
    });

    beforeEach(() => {
      smartCarApi = proxyquire('../../lib/utils/SmartCarApi', {
        './GMApi': {
          vehicleInfo: id => promise,
          vehicleSecurityStatus: id => promise,
          vehicleEnergy: id => promise,
          vehicleEngine: (id, action) => promise,
        },
      }).default;
    });

    describe('vehicleInfo', () => {
      it('Should return correct error message', () => {
        return smartCarApi.vehicleInfo(123).catch((err) => {
          const { status, message } = err;

          expect(status).to.eql(42);
          expect(message).to.eql('foo');
        }); 
      }); 
    });

    describe('security', () => {
      it('Should return correct error message', () => {
        return smartCarApi.security(123).catch((err) => {
          const { status, message } = err;

          expect(status).to.eql(42);
          expect(message).to.eql('foo');
        }); 
      }); 
    });

    describe('energy', () => {
      it('Should return correct error message', () => {
        return smartCarApi.energy(123).catch((err) => {
          const { status, message } = err;

          expect(status).to.eql(42);
          expect(message).to.eql('foo');
        }); 
      }); 
    });

    describe('engine', () => {
      it('Should return correct error message', () => {
        return smartCarApi.engine(123, 'foo').catch((err) => {
          const { status, message } = err;

          expect(status).to.eql(42);
          expect(message).to.eql('foo');
        }); 
      }); 
    });
  });
});
