function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (
    req.headers['accept'] &&
    req.headers['accept'].includes('application/json')
  ) {
    // Return JSON response
    res.status(err.statusCode).json({
      status: err.status,
      error: err.message,
    });
  } else {
    // Return HTML response or a fallback for non-JSON requests
    res.status(err.statusCode).send(`<h1>${err.status}: ${err.message}</h1>`);
  }
}

module.exports = errorHandler;
