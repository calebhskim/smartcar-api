const req = require('request');
const request = req.defaults({
  baseUrl: 'http://gmapi.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json'
  }
});

const GMApi = {
  getVehicleInfo: function(id, callback) {
    request({
      url: '/getVehicleInfoService',
      method: 'POST',
      json: {
        id: id,
        responseType: "JSON"
      }
    },
    callback
    )
  },
  getSecurityStatus: function(id, callback) {
    request({
      url: '/getSecurityStatusService',
      method: 'POST',
      json: {
        id: id,
        responseType: "JSON"
      }
    },
    callback
    )
  }
}

module.exports = GMApi;
