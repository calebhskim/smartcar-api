import chai, { expect } from 'chai';
import spies from 'chai-spies';
import errorHandler from '../../lib/middleware/ErrorHandler';

chai.use(spies);

describe('ErrorHandler', () => {
  describe('Given a valid error', () => {
    it('Should return error status and message', (done) => {
      const testErr = {
        status: 123,
        message: 'Invalid body.',
      };
 
      const send = err => err;
      const sendSpy = chai.spy(send);
      const status = errStatus => ({ send: sendSpy });
      const statusSpy = chai.spy(status);
      const err = errorHandler(testErr, null, { status: statusSpy });

      expect(statusSpy).to.have.been.called();
      expect(statusSpy).to.have.been.called.with(123);
      expect(sendSpy).to.have.been.called();
      expect(sendSpy).to.have.been.called.with(testErr);
      done();
    });
  });

  describe('Given no error', () => {
    it('Should call callback', (done) => {
      const cb = () => {
        return 42; 
      };

      const spy = chai.spy(cb);
      const err = errorHandler(null, null, null, spy);
      
      expect(spy).to.have.been.called();
      done();
    });
  });
});
