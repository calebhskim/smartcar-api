const sinon = require('sinon');
const { expect } = require('chai');

const once = function (callback) {
  return callback;
}

describe('Hello', function() {
  describe('#World', function() {
    it('should be true', function() {
      expect(true).to.eql(true);
    });
  });
  describe('stuff', function() {
    it("returns the return value from the original function", function () {
      var callback = sinon.stub().returns(42);
      var proxy = once(callback);
      expect(proxy()).to.eql(42);
    });
  });
});
