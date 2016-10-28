import express from 'express';
import scApi from '../../utils/SmartCarApi';

const router = express.Router();

router.get('/:id', (req, res) => {
  scApi.vehicleInfo(req.params.id).then((response) => {
    const { status, data } = response;
    return res.status(status).json(data);
  }).catch((error) => {
    return res.status(error.status).json(error);
  });
});

router.get('/:id/doors', (req, res) => {
  scApi.security(req.params.id).then((response) => {
    const { status, data } = response;
    return res.status(status).json(data);
  }).catch((error) => {
    return res.status(error.status).json(error);
  });
});

router.get('/:id/fuel', (req, res) => {
  scApi.energy(req.params.id).then((response) => {
    const { status, data: { tank } } = response;

    if (tank.percentage === 'null') {
      return res.status(400).json({
        status: 400,
        message: `Vehicle with id ${req.params.id} does not have fuel.`,
      });
    }

    return res.status(status).json(tank);
  }).catch((error) => {
    return res.status(error.status).json(error);
  });;
});

router.get('/:id/battery', (req, res) => {
  scApi.energy(req.params.id).then((response) => {
    const { status, data: { battery } } = response;

    if (battery.percentage === 'null') {
      return res.status(400).json({
        status: 400,
        message: `Vehicle with id ${req.params.id} does not have a battery.`,
      });
    }

    return res.status(status).json(battery);
  }).catch((error) => {
    return res.status(error.status).json(error);
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

    return scApi.engine(req.params.id, body.action).then((response) => {
      const { status, data } = response;

      return res.status(status).json(data);
    }).catch((error) => {
      return res.status(error.status).json(error);
    });
  }

  return res.status(400).json({
    status: 400,
    message: 'Invalid or no action sent.',
  });
});

module.exports = router;
