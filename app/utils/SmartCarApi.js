const gm = require('./GMApi');
const errorHandler = require('./ErrorHandler');

const SmartCarApi = {
  vehicleInfo: (id, cb) => {
    gm.vehicleInfo(id, (error, response) => {
      if (error) {
        return cb(errorHandler(error));
      }

      const { status, data: { vin, color, fourDoorSedan, driveTrain } } = response;

      return cb(null, {
        data: {
          vin: vin.value,
          color: color.value,
          doorCount: fourDoorSedan.value ? 4 : 2,
          driveTrain: driveTrain.value,
        },
        status,
      });
    });
  },
  security: (id, cb) => {
    gm.vehicleSecurityStatus(id, (error, response) => {
      if (error) {
        return cb(errorHandler(error));
      }

      const { status, data: { doors: { values } } } = response;

      return cb(null, {
        data: values.map((door) => {
          const { location, locked } = door;

          return {
            location: location.value,
            locked: locked.value,
          };
        }),
        status,
      });
    });
  },
  energy: (id, cb) => {
    gm.vehicleEnergy(id, (error, response) => {
      if (error) {
        return cb(errorHandler(error));
      }

      const { status, data: { tankLevel, batteryLevel } } = response;

      return cb(null, {
        data: {
          tank: {
            percentage: tankLevel.value,
          },
          battery: {
            percentage: batteryLevel.value,
          },
        },
        status,
      });
    });
  },
  engine: (id, action, cb) => {
    const commands = { START: 'START_VEHICLE', STOP: 'STOP_VEHICLE' };
    const result = { EXECUTED: 'success', FAILED: 'error' };

    gm.vehicleEngine(id, commands[action], (error, response) => {
      if (error) {
        return cb(errorHandler(error));
      }

      const { status, actionResult } = response;

      return cb(null, {
        data: {
          status: result[actionResult.status],
        },
        status,
      });
    });
  },
};

module.exports = SmartCarApi;
