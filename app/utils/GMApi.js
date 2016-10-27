const req = require('request');

const request = req.defaults({
  baseUrl: 'http://gmapi.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

const GMApi = {
  getVehicleInfo: (id, callback) => {
    request({
      url: '/getVehicleInfoService',
      method: 'POST',
      json: {
        id,
        responseType: 'JSON',
      },
    }, (error, response, body) => {
      if (error) {
        return callback(error);
      }

      const { status, data, reason } = body;

      if (status !== '200') {
        return callback({
          status,
          message: reason,
        });
      }

      return callback(null, {
        status,
        data,
      });
    });
  },
  getSecurityStatus: (id, callback) => {
    request({
      url: '/getSecurityStatusService',
      method: 'POST',
      json: {
        id,
        responseType: 'JSON',
      },
    }, (error, response, body) => {
      if (error) {
        return callback(error);
      }

      const { status, data, reason } = body;

      if (status !== '200') {
        return callback({
          status,
          message: reason,
        });
      }

      return callback(null, {
        status,
        data,
      });
    });
  },
  getEnergy: (id, callback) => {
    request({
      url: '/getEnergyService',
      method: 'POST',
      json: {
        id,
        responseType: 'JSON',
      },
    }, (error, response, body) => {
      if (error) {
        return callback(error);
      }

      const { status, data, reason } = body;

      if (status !== '200') {
        return callback({
          status,
          message: reason,
        });
      }

      return callback(null, {
        status,
        data,
      });
    });
  },
  postEngine: (id, command, callback) => {
    request({
      url: '/actionEngineService',
      method: 'POST',
      json: {
        id,
        command,
        responseType: 'JSON',
      },
    }, (error, response, body) => {
      if (error) {
        return callback(error);
      }

      const { status, actionResult, reason } = body;

      if (status !== '200') {
        return callback({
          status,
          message: reason,
        });
      }

      return callback(null, {
        status,
        actionResult,
      });
    });
  },
};

module.exports = GMApi;
