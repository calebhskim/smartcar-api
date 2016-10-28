'use strict';

module.exports = function (error) {
  var status = error.status,
      message = error.message;

  return {
    status: status || 500,
    message: message || 'Internal server error.'
  };
};