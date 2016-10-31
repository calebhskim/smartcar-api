import errors from './Errors';

export default (error) => {
  const { status } = error;
  const statusCode = status || 500;

  return {
    status: statusCode,
    message: errors[statusCode],
  };
};
