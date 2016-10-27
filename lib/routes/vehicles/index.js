'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _SmartCarApi = require('../../utils/SmartCarApi');

var _SmartCarApi2 = _interopRequireDefault(_SmartCarApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:id', function (req, res) {
  _SmartCarApi2.default.vehicleInfo(req.params.id, function (error, response) {
    if (error) {
      return res.status(error.status).json(error);
    }

    var status = response.status,
        data = response.data;

    return res.status(status).json(data);
  });
});

router.get('/:id/doors', function (req, res) {
  _SmartCarApi2.default.security(req.params.id, function (error, response) {
    if (error) {
      return res.status(error.status).json(error);
    }

    var status = response.status,
        data = response.data;

    return res.status(status).json(data);
  });
});

router.get('/:id/fuel', function (req, res) {
  _SmartCarApi2.default.energy(req.params.id, function (error, response) {
    if (error) {
      return res.status(error.status).json(error);
    }

    var status = response.status,
        tank = response.data.tank;


    if (tank.percentage === 'null') {
      return res.status(400).json({
        status: 400,
        message: 'Vehicle with id ' + req.params.id + ' does not have fuel.'
      });
    }
    return res.status(status).json(tank);
  });
});

router.get('/:id/battery', function (req, res) {
  _SmartCarApi2.default.energy(req.params.id, function (error, response) {
    if (error) {
      return res.status(error.status).json(error);
    }

    var status = response.status,
        battery = response.data.battery;


    if (battery.percentage === 'null') {
      return res.status(400).json({
        status: 400,
        message: 'Vehicle with id ' + req.params.id + ' does not have a battery.'
      });
    }

    return res.status(status).json(battery);
  });
});

router.post('/:id/engine', function (req, res) {
  var body = req.body;


  if (body && body.action) {
    if (body.action !== 'START' && body.action !== 'STOP') {
      return res.status(400).json({
        status: 400,
        message: 'Invalid action ' + body.action + ' is not one of START | STOP.'
      });
    }

    return _SmartCarApi2.default.engine(req.params.id, body.action, function (error, response) {
      if (error) {
        return res.status(error.status).json(error);
      }

      var status = response.status,
          data = response.data;


      return res.status(status).json(data);
    });
  }

  return res.status(400).json({
    status: 400,
    message: 'Invalid or no action sent.'
  });
});

module.exports = router;