const gm = require('./GMApi');
const errorHandler = require('./ErrorHandler');

const SmartCarApi = {
  vehicleInfo: (id, cb) => {
    gm.getVehicleInfo(id, (error, response) => {
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
    gm.getSecurityStatus(id, (error, response) => {
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
    gm.getEnergy(id, (error, response) => {
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
};

module.exports = SmartCarApi;
