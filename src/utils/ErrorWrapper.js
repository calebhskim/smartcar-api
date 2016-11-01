import errors from './Errors';

export default (error, code, message) => {
  const statusCode = (error && error.status) || 500;

  return {
    status: code || statusCode,
    message: message || errors[statusCode],
  };
};
