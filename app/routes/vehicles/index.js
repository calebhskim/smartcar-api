const express = require('express');
const scApi = require('utils/SmartCarApi');

const router = express.Router();

router.get('/:id', (req, res) => {
  scApi.vehicleInfo(req.params.id, (error, response) => {
    if (error) {
      return res.status(error.status).json(error);
    }

    const { status, data } = response;
    return res.status(status).json(data);
  });
});

router.get('/:id/doors', (req, res) => {
  scApi.security(req.params.id, (error, response) => {
    if (error) {
      return res.status(error.status).json(error);
    }

    const { status, data } = response;
    return res.status(status).json(data);
  });
});

router.get('/:id/fuel', (req, res) => {
  scApi.energy(req.params.id, (error, response) => {
    if (error) {
      return res.status(error.status).json(error);
    }

    const { status, data: { tank } } = response;

    if (tank.percentage === 'null') {
      return res.status(400).json({
        status: 400,
        message: `Vehicle with id ${req.params.id} does not have fuel.`,
      });
    }
    return res.status(status).json(tank);
  });
});

router.get('/:id/battery', (req, res) => {
  scApi.energy(req.params.id, (error, response) => {
    if (error) {
      return res.status(error.status).json(error);
    }

    const { status, data: { battery } } = response;

    if (battery.percentage === 'null') {
      return res.status(400).json({
        status: 400,
        message: `Vehicle with id ${req.params.id} does not have a battery.`,
      });
    }

    return res.status(status).json(battery);
  });
});

router.post('/:id/engine', (req, res) => {
  const { body } = req;

  if (body && body.action) {
    if (body.action !== 'START' && body.action !== 'STOP') {
      return res.status(400).json({
        status: 400,
        message: `Invalid action ${body.action} is not one of START | STOP.`,
      });
    }

    return scApi.engine(req.params.id, body.action, (error, response) => {
      if (error) {
        return res.status(error.status).json(error);
      }

      const { status, data } = response;

      return res.status(status).json(data);
    });
  }

  return res.status(400).json({
    status: 400,
    message: 'Invalid or no action sent.',
  });
});

module.exports = router;
