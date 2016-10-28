'use strict';

var _GMApi = require('./GMApi');

var _GMApi2 = _interopRequireDefault(_GMApi);

var _ErrorHandler = require('./ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmartCarApi = {
  vehicleInfo: function vehicleInfo(id) {
    return new Promise(function (resolve, reject) {
      _GMApi2.default.vehicleInfo(id).then(function (response) {
        var status = response.status,
            _response$data$data = response.data.data,
            vin = _response$data$data.vin,
            color = _response$data$data.color,
            fourDoorSedan = _response$data$data.fourDoorSedan,
            driveTrain = _response$data$data.driveTrain;


        if (status !== 200) {
          reject({
            status: status,
            message: reason
          });
        }

        resolve({
          data: {
            vin: vin.value,
            color: color.value,
            doorCount: fourDoorSedan.value ? 4 : 2,
            driveTrain: driveTrain.value
          },
          status: status
        });
      }).catch(function (error) {
        reject((0, _ErrorHandler2.default)(error));
      });
    });
  },
  security: function security(id) {
    return new Promise(function (resolve, reject) {
      _GMApi2.default.vehicleSecurityStatus(id).then(function (response) {
        var status = response.status,
            values = response.data.data.doors.values;


        if (status !== 200) {
          reject({
            status: status,
            message: reason
          });
        }

        resolve({
          data: values.map(function (door) {
            var location = door.location,
                locked = door.locked;


            return {
              location: location.value,
              locked: locked.value
            };
          }),
          status: status
        });
      }).catch(function (error) {
        reject((0, _ErrorHandler2.default)(error));
      });
    });
  },
  energy: function energy(id) {
    return new Promise(function (resolve, reject) {
      _GMApi2.default.vehicleEnergy(id).then(function (response) {
        var status = response.status,
            _response$data$data2 = response.data.data,
            tankLevel = _response$data$data2.tankLevel,
            batteryLevel = _response$data$data2.batteryLevel;


        if (status !== 200) {
          reject({
            status: status,
            message: reason
          });
        }

        resolve({
          data: {
            tank: {
              percentage: tankLevel.value
            },
            battery: {
              percentage: batteryLevel.value
            }
          },
          status: status
        });
      }).catch(function (error) {
        reject((0, _ErrorHandler2.default)(error));
      });
    });
  },
  engine: function engine(id, action) {
    var commands = { START: 'START_VEHICLE', STOP: 'STOP_VEHICLE' };
    var result = { EXECUTED: 'success', FAILED: 'error' };

    return new Promise(function (resolve, reject) {
      _GMApi2.default.vehicleEngine(id, commands[action]).then(function (response) {
        var status = response.status,
            actionResult = response.data.actionResult;


        if (status !== 200) {
          reject({
            status: status,
            message: reason
          });
        }

        resolve({
          data: {
            status: result[actionResult.status]
          },
          status: status
        });
      }).catch(function (error) {
        reject((0, _ErrorHandler2.default)(error));
      });
    });
  }
};

module.exports = SmartCarApi;