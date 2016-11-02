import errorWrapper from '../utils/ErrorWrapper';

/* Handle body-parser errors */
export default (err, req, res, next) => {
  if (err) {
    const error = errorWrapper(err, null, 'Invalid body.');
    return res.status(error.status).send(error);
  }

  return next();
};
