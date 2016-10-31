import express from 'express';
import apicache from 'apicache';
import scApi from '../../utils/SmartCarApi';

const router = express.Router();
const cache = apicache.middleware;

const onlyStatus200 = req => req.statusCode === 200;

router.get('/:id', cache('10 minutes', onlyStatus200), (req, res) => {
  scApi.vehicleInfo(req.params.id)
    .then(({ status, data }) => res.status(status).json(data))
    .catch(error => res.status(error.status).json(error));
});

router.get('/:id/doors', (req, res) => {
  scApi.security(req.params.id)
    .then(({ status, data }) => res.status(status).json(data))
    .catch(error => res.status(error.status).json(error));
});

router.get('/:id/fuel', (req, res) => {
  scApi.energy(req.params.id).then(({ status, data: { tank } }) => {
    if (tank.percentage === 'null') {
      return res.status(404).json({
        status: 404,
        message: `Vehicle with id ${req.params.id} does not have fuel.`,
      });
    }

    return res.status(status).json(tank);
  }).catch(error => res.status(error.status).json(error));
});

router.get('/:id/battery', (req, res) => {
  scApi.energy(req.params.id).then(({ status, data: { battery } }) => {
    if (battery.percentage === 'null') {
      return res.status(404).json({
        status: 404,
        message: `Vehicle with id ${req.params.id} does not have a battery.`,
      });
    }

    return res.status(status).json(battery);
  }).catch(error => res.status(error.status).json(error));
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

    return scApi.engine(req.params.id, body.action)
      .then(({ status, data }) => res.status(status).json(data))
      .catch(error => res.status(error.status).json(error));
  }

  return res.status(400).json({
    status: 400,
    message: 'Invalid or no action sent.',
  });
});

export default router;
