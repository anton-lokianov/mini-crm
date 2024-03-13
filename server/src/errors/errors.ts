abstract class BaseError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// status code 400 errors

class NotFoundError extends BaseError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class BadRequestError extends BaseError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class ValidationError extends BaseError {
  constructor(message = "Validation Error") {
    super(message, 422);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenError extends BaseError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

// status code 500 errors

class InternalServerError extends BaseError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

class ServiceUnavailableError extends BaseError {
  constructor(message = "Service Unavailable") {
    super(message, 503);
  }
}

export {
  BaseError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  ValidationError,
  ServiceUnavailableError,
};
