import { expect } from 'chai';
import errorHandler from '../../lib/utils/ErrorHandler';

describe('Error Handler', () => {
  describe('Given a valid error', () => {
    it('Should return error status and message', (done) => {
      const err = errorHandler({
        status: 123,
        message: "cookie",
      });

      expect(err.status).to.eql(123);
      expect(err.message).to.eql('cookie');
      done();
    });
  });

  describe('Given a invalid/improper error', () => {
    it('Should default to an internal server error', (done) => {
      const err = errorHandler({
        mustache: 'no',
      });

      expect(err.status).to.eql(500);
      expect(err.message).to.eql('Internal server error.');
      done();
    });
  });
});
