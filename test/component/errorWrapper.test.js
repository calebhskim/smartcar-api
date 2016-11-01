import { expect } from 'chai';
import errorWrapper from '../../lib/utils/ErrorWrapper';

describe('ErrorWrapper', () => {
  describe('Given a valid error', () => {
    it('Should return error status and message', (done) => {
      const err = errorWrapper({
        status: 123,
        message: "cookie",
      });

      expect(err.status).to.eql(123);
      expect(err.message).to.eql('cookie');
      done();
    });
  });

  describe('Given an invalid/improper error', () => {
    it('Should default to an internal server error', (done) => {
      const err = errorWrapper({
        mustache: 'no',
      });

      expect(err.status).to.eql(500);
      expect(err.message).to.eql('Internal server error.');
      done();
    });
  });
});
