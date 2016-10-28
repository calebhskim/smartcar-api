'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.baseURL = 'http://gmapi.azurewebsites.net';
_axios2.default.defaults.headers.post['Content-Type'] = 'application/json';
_axios2.default.defaults.timeout = 5000;

var GMApi = {
  vehicleInfo: function vehicleInfo(id) {
    return _axios2.default.post('/getVehicleInfoService', { id: id, responseType: 'JSON' });
  },
  vehicleSecurityStatus: function vehicleSecurityStatus(id) {
    return _axios2.default.post('/getSecurityStatusService', { id: id, responseType: 'JSON' });
  },
  vehicleEnergy: function vehicleEnergy(id) {
    return _axios2.default.post('/getEnergyService', { id: id, responseType: 'JSON' });
  },
  vehicleEngine: function vehicleEngine(id, command) {
    return _axios2.default.post('/actionEngineService', {
      id: id,
      command: command,
      responseType: 'JSON'
    });
  }
};

module.exports = GMApi;