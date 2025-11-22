// src/server/appError.js
// Custom application error class for consistent error handling

class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.details = details; // optional extra info (validation errors, etc.)
    this.isOperational = true;

    // Ensure the stack trace points to the correct place
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
