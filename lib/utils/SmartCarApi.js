'use strict';

var _GMApi = require('./GMApi');

var _GMApi2 = _interopRequireDefault(_GMApi);

var _ErrorHandler = require('./ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmartCarApi = {
  vehicleInfo: function vehicleInfo(id, cb) {
    _GMApi2.default.vehicleInfo(id, function (error, response) {
      if (error) {
        return cb((0, _ErrorHandler2.default)(error));
      }

      var status = response.status,
          _response$data = response.data,
          vin = _response$data.vin,
          color = _response$data.color,
          fourDoorSedan = _response$data.fourDoorSedan,
          driveTrain = _response$data.driveTrain;


      return cb(null, {
        data: {
          vin: vin.value,
          color: color.value,
          doorCount: fourDoorSedan.value ? 4 : 2,
          driveTrain: driveTrain.value
        },
        status: status
      });
    });
  },
  security: function security(id, cb) {
    _GMApi2.default.vehicleSecurityStatus(id, function (error, response) {
      if (error) {
        return cb((0, _ErrorHandler2.default)(error));
      }

      var status = response.status,
          values = response.data.doors.values;


      return cb(null, {
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
    });
  },
  energy: function energy(id, cb) {
    _GMApi2.default.vehicleEnergy(id, function (error, response) {
      if (error) {
        return cb((0, _ErrorHandler2.default)(error));
      }

      var status = response.status,
          _response$data2 = response.data,
          tankLevel = _response$data2.tankLevel,
          batteryLevel = _response$data2.batteryLevel;


      return cb(null, {
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
    });
  },
  engine: function engine(id, action, cb) {
    var commands = { START: 'START_VEHICLE', STOP: 'STOP_VEHICLE' };
    var result = { EXECUTED: 'success', FAILED: 'error' };

    _GMApi2.default.vehicleEngine(id, commands[action], function (error, response) {
      if (error) {
        return cb((0, _ErrorHandler2.default)(error));
      }

      var status = response.status,
          actionResult = response.actionResult;


      return cb(null, {
        data: {
          status: result[actionResult.status]
        },
        status: status
      });
    });
  }
};

module.exports = SmartCarApi;