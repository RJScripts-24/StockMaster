// Source/Spec: /mnt/data/StockMaster.pdf
// shared/middlewares/errorHandler.js
// Central Express error handler middleware

module.exports = function errorHandler(err, req, res, next) {
  // Default values
  const statusCode = err.statusCode || err.status || 500;
  const isOperational = err.isOperational || false; // set this on known errors if you want

  // Log error server-side (could be hooked to a logger like pino/winston)
  if (process.env.NODE_ENV === 'production') {
    // In production, avoid logging stack to stdout in this file; delegate to a logger
    console.error(`[Error] ${new Date().toISOString()} - ${err.message}`);
  } else {
    console.error(err);
  }

  // Standardize error response
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Attach additional info for operational or validation errors
  if (!isOperational && process.env.NODE_ENV !== 'production') {
    // include stack and details in non-production for easier debugging
    response.stack = err.stack;
    if (err.errors) response.errors = err.errors; // e.g. validation errors array
  } else {
    // For operational errors you may want to include extra context
    if (err.errors) response.errors = err.errors;
  }

  // If the error object contains a code (e.g. from Prisma), include a short code
  if (err.code) response.code = err.code;

  // Send JSON response
  res.status(statusCode).json(response);
};
