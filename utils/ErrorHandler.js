module.exports = function(error) {
  return {
    code: error.code || 'INTERNAL',
    status: error.status || 500,
    message: error.message || 'Internal Server Error'
  }
}
