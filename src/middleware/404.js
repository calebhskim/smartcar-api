/* eslint-disable no-unused-vars */
/* istanbul ignore next */
export default (req, res, next) => {
  res.status(404);

  if (req.accepts('html')) {
    return res.render('404', { url: req.url });
  }

  if (req.accepts('json')) {
    return res.send({ error: 'Not Found' });
  }

  return res.type('txt').send('Not Found');
};
