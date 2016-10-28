import axios from 'axios';

axios.defaults.baseURL = 'http://gmapi.azurewebsites.net';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

const GMApi = {
  vehicleInfo: id => axios.post('/getVehicleInfoService', { id, responseType: 'JSON' }),
  vehicleSecurityStatus: id => axios.post('/getSecurityStatusService', { id, responseType: 'JSON' }),
  vehicleEnergy: id => axios.post('/getEnergyService', { id, responseType: 'JSON' }),
  vehicleEngine: (id, command) => axios.post('/actionEngineService', {
    id,
    command,
    responseType: 'JSON',
  }),
};

module.exports = GMApi;
