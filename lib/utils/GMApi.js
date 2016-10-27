'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = _request2.default.defaults({
  baseUrl: 'http://gmapi.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json'
  }
});

var GMApi = {
  vehicleInfo: function vehicleInfo(id, callback) {
    request.post({
      url: '/getVehicleInfoService',
      json: {
        id: id,
        responseType: 'JSON'
      }
    }, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      var status = body.status,
          data = body.data,
          reason = body.reason;


      if (status !== '200') {
        return callback({
          status: status,
          message: reason
        });
      }

      return callback(null, {
        status: status,
        data: data
      });
    });
  },
  vehicleSecurityStatus: function vehicleSecurityStatus(id, callback) {
    request.post({
      url: '/getSecurityStatusService',
      json: {
        id: id,
        responseType: 'JSON'
      }
    }, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      var status = body.status,
          data = body.data,
          reason = body.reason;


      if (status !== '200') {
        return callback({
          status: status,
          message: reason
        });
      }

      return callback(null, {
        status: status,
        data: data
      });
    });
  },
  vehicleEnergy: function vehicleEnergy(id, callback) {
    request.post({
      url: '/getEnergyService',
      json: {
        id: id,
        responseType: 'JSON'
      }
    }, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      var status = body.status,
          data = body.data,
          reason = body.reason;


      if (status !== '200') {
        return callback({
          status: status,
          message: reason
        });
      }

      return callback(null, {
        status: status,
        data: data
      });
    });
  },
  vehicleEngine: function vehicleEngine(id, command, callback) {
    request.post({
      url: '/actionEngineService',
      json: {
        id: id,
        command: command,
        responseType: 'JSON'
      }
    }, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      var status = body.status,
          actionResult = body.actionResult,
          reason = body.reason;


      if (status !== '200') {
        return callback({
          status: status,
          message: reason
        });
      }

      return callback(null, {
        status: status,
        actionResult: actionResult
      });
    });
  }
};

module.exports = GMApi;