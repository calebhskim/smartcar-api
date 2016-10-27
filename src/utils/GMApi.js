import req from 'request';

const request = req.defaults({
  baseUrl: 'http://gmapi.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

const GMApi = {
  vehicleInfo: (id, callback) => {
    request.post({
      url: '/getVehicleInfoService',
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
  vehicleSecurityStatus: (id, callback) => {
    request.post({
      url: '/getSecurityStatusService',
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
  vehicleEnergy: (id, callback) => {
    request.post({
      url: '/getEnergyService',
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
  vehicleEngine: (id, command, callback) => {
    request.post({
      url: '/actionEngineService',
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
