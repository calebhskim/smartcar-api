import errors from './Errors';

export default (error, code, message) => {
  let statusCode;
  let mes;

  if (error) {
    statusCode = error.status ? error.status : 500;
    mes = error.message ? error.message : errors[statusCode];
  }

  return {
    status: code || statusCode,
    message: message || mes,
  };
};
