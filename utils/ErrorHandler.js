module.exports = (error) => {
  const { code, status, message } = error;
  return {
    code: code || 'INTERNAL',
    status: status || 500,
    message: message || 'Internal Server Error',
  };
};
