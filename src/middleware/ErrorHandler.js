import errorWrapper from '../utils/ErrorWrapper';

export default (err, req, res, next) => {
  if (err) {
    const error = errorWrapper(err);
    return res.status(error.status).send(error);
  }

  return next();
};
