module.exports = function httpResponse(statusCode, body) {
  return {
    statusCode,
    body
  };
};
