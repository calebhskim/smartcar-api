import gm from './GMApi';
import errorHandler from './ErrorHandler';

const SmartCarApi = {
  vehicleInfo: id => gm.vehicleInfo(id).then(({ data: { status, data, reason } }) => {
    if (status !== '200') {
      return Promise.reject({ status, message: reason });
    }

    const { vin, color, fourDoorSedan, driveTrain } = data;

    return {
      data: {
        vin: vin.value,
        color: color.value,
        doorCount: fourDoorSedan.value ? 4 : 2,
        driveTrain: driveTrain.value,
      },
      status,
    };
  }).catch(error => Promise.reject(errorHandler(error))),
  security: id => new Promise((resolve, reject) => {
    gm.vehicleSecurityStatus(id).then((response) => {
      const { status, data, reason } = response.data;

      if (status !== '200') {
        reject({
          status,
          message: reason,
        });
      }

      const { doors: { values } } = data;

      resolve({
        data: values.map((door) => {
          const { location, locked } = door;

          return {
            location: location.value,
            locked: locked.value,
          };
        }),
        status,
      });
    }).catch(error => reject(errorHandler(error)));
  }),
  energy: id => new Promise((resolve, reject) => {
    gm.vehicleEnergy(id).then((response) => {
      const { status, data, reason } = response.data;

      if (status !== '200') {
        reject({
          status,
          message: reason,
        });
      }

      const { tankLevel, batteryLevel } = data;

      resolve({
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
    }).catch(error => reject(errorHandler(error)));
  }),
  engine: (id, action) => {
    const commands = { START: 'START_VEHICLE', STOP: 'STOP_VEHICLE' };
    const result = { EXECUTED: 'success', FAILED: 'error' };

    return new Promise((resolve, reject) => {
      gm.vehicleEngine(id, commands[action]).then((response) => {
        const { status, actionResult, reason } = response.data;

        if (status !== '200') {
          reject({
            status,
            message: reason,
          });
        }

        resolve({
          data: {
            status: result[actionResult.status],
          },
          status,
        });
      }).catch(error => reject(errorHandler(error)));
    });
  },
};

export default SmartCarApi;
