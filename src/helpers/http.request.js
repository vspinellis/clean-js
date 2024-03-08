module.exports = function httpRequest(statusCode, body) {
  return {
    statusCode,
    body
  };
};
