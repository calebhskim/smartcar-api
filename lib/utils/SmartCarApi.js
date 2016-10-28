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
        var _response$data = response.data,
            status = _response$data.status,
            data = _response$data.data,
            reason = _response$data.reason;


        if (status !== '200') {
          reject({
            status: status,
            message: reason
          });
        }

        var vin = data.vin,
            color = data.color,
            fourDoorSedan = data.fourDoorSedan,
            driveTrain = data.driveTrain;


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
        return reject((0, _ErrorHandler2.default)(error));
      });
    });
  },
  security: function security(id) {
    return new Promise(function (resolve, reject) {
      _GMApi2.default.vehicleSecurityStatus(id).then(function (response) {
        var _response$data2 = response.data,
            status = _response$data2.status,
            data = _response$data2.data,
            reason = _response$data2.reason;


        if (status !== '200') {
          reject({
            status: status,
            message: reason
          });
        }

        var values = data.doors.values;


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
        return reject((0, _ErrorHandler2.default)(error));
      });
    });
  },
  energy: function energy(id) {
    return new Promise(function (resolve, reject) {
      _GMApi2.default.vehicleEnergy(id).then(function (response) {
        var _response$data3 = response.data,
            status = _response$data3.status,
            data = _response$data3.data,
            reason = _response$data3.reason;


        if (status !== '200') {
          reject({
            status: status,
            message: reason
          });
        }

        var tankLevel = data.tankLevel,
            batteryLevel = data.batteryLevel;


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
        return reject((0, _ErrorHandler2.default)(error));
      });
    });
  },
  engine: function engine(id, action) {
    var commands = { START: 'START_VEHICLE', STOP: 'STOP_VEHICLE' };
    var result = { EXECUTED: 'success', FAILED: 'error' };

    return new Promise(function (resolve, reject) {
      _GMApi2.default.vehicleEngine(id, commands[action]).then(function (response) {
        var _response$data4 = response.data,
            status = _response$data4.status,
            actionResult = _response$data4.actionResult,
            reason = _response$data4.reason;


        if (status !== '200') {
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
        return reject((0, _ErrorHandler2.default)(error));
      });
    });
  }
};

module.exports = SmartCarApi;