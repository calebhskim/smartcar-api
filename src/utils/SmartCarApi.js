import gm from './GMApi';
import errorWrapper from './ErrorWrapper';

const commands = { START: 'START_VEHICLE', STOP: 'STOP_VEHICLE' };
const result = { EXECUTED: 'success', FAILED: 'error' };

const SmartCarApi = {
  vehicleInfo: id => gm.vehicleInfo(id).then((response) => {
    const { status, data, reason } = response.data;

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
  }, error => Promise.reject(errorWrapper(error))),
  security: id => gm.vehicleSecurityStatus(id).then((response) => {
    const { status, data, reason } = response.data;

    if (status !== '200') {
      return Promise.reject({ status, message: reason });
    }

    const { doors: { values } } = data;

    return {
      data: values.map((door) => {
        const { location, locked } = door;

        return {
          location: location.value,
          locked: locked.value,
        };
      }),
      status,
    };
  }, error => Promise.reject(errorWrapper(error))),
  energy: id => gm.vehicleEnergy(id).then((response) => {
    const { status, data, reason } = response.data;

    if (status !== '200') {
      return Promise.reject({ status, message: reason });
    }

    const { tankLevel, batteryLevel } = data;

    return {
      data: {
        tank: {
          percentage: tankLevel.value,
        },
        battery: {
          percentage: batteryLevel.value,
        },
      },
      status,
    };
  }, error => Promise.reject(errorWrapper(error))),
  engine: (id, action) => gm.vehicleEngine(id, commands[action]).then((response) => {
    const { status, actionResult, reason } = response.data;

    if (status !== '200') {
      return Promise.reject({ status, message: reason });
    }

    return {
      data: {
        status: result[actionResult.status],
      },
      status,
    };
  }, error => Promise.reject(errorWrapper(error))),
};

export default SmartCarApi;
