const gm = require('./GMApi');
const errorHandler = require('./ErrorHandler');

const SmartCarApi = {
  vehicleInfo: function(id, cb) {
    gm.getVehicleInfo(id, function(error, response, body) {
      if (error) {
        cb(errorHandler(error));
      }

      const { status, data: { vin, color, fourDoorSedan, driveTrain } } = body;
      cb(null, {
        data: {
          vin: vin.value,
          color: color.value,
          doorCount: fourDoorSedan.value ? 4 : 2,
          driveTrain: driveTrain.value
        },
        status: status
      });
    });
  }
}

module.exports = SmartCarApi;
