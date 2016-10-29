export default (error) => {
  const { status, message } = error;
  return {
    status: status || 500,
    message: message || 'Internal server error.',
  };
};
