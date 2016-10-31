import errorWrapper from '../utils/ErrorWrapper';

export default (err, req, res, next) => {
  if (err) {
    const error = errorWrapper(err);
    res.status(error.status).send(error.message);
  }

  next();
};
