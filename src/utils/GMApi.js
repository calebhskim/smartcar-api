import axios from 'axios';
import req from 'request';

axios.defaults.baseURL = 'http://gmapi.azurewebsites.net';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

const request = req.defaults({
  baseUrl: 'http://gmapi.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

const GMApi = {
  vehicleInfo: (id) => {
    return axios.post('/getVehicleInfoService', {
      id,
      responseType: 'JSON',
    });
  },
  vehicleSecurityStatus: (id) => {
    return axios.post('/getSecurityStatusService', {
      id,
      responseType: 'JSON',
    });
  },
  vehicleEnergy: (id) => {
    return axios.post('/getEnergyService', {
      id,
      responseType: 'JSON',
    });
  },
  vehicleEngine: (id, command) => {
    return axios.post('/actionEngineService', {
      id,
      command,
      responseType: 'JSON',
    });
  },
};

module.exports = GMApi;
