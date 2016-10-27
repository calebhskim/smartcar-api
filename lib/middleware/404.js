'use strict';

/* eslint-disable no-unused-vars */
/* istanbul ignore next */
module.exports = function (req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not Found' });
    return;
  }

  res.type('txt').send('Not Found');
};