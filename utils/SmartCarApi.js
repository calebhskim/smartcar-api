const gm = require('./GMApi');
const errorHandler = require('./ErrorHandler');

const SmartCarApi = {
  vehicleInfo: (id, cb) => {
    gm.getVehicleInfo(id, (error, response, body) => {
      if (error) {
        return cb(errorHandler(error));
      }

      const { status, data, reason } = body;

      if (status !== '200') {
        return cb(null, {
          data: {
            message: reason,
          },
          status,
        });
      }

      const { vin, color, fourDoorSedan, driveTrain } = data;

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
    gm.getSecurityStatus(id, (error, response, body) => {
      if (error) {
        return cb(errorHandler(error));
      }

      const { status, data, reason } = body;

      if (status !== '200') {
        return cb(null, {
          data: {
            message: reason,
          },
          status,
        });
      }

      const { doors: { values } } = data;

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
};

module.exports = SmartCarApi;
