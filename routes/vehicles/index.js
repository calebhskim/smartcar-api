const express = require('express');
const router = express.Router();
const scApi = require('utils/SmartCarApi');

router.get('/:id', (req, res) => {
  scApi.vehicleInfo(req.params.id, (error, response) => {
    if (error) {
      res.status(error.status).json(error);
    }

    const { status, data } = response;
    res.status(status).json(data);
  });
});

module.exports = router;
