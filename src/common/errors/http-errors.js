class HttpError extends Error {
  constructor(message) {
    super(message)
    this.code = 500
  }
}

class BadRequestError extends HttpError {
  constructor(message) {
    super(message)
    this.code = 400
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message)
    this.code = 401
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    super(message)
    this.code = 403
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(message)
    this.code = 404
  }
}

class ConflictedError extends HttpError {
  constructor(message) {
    super(message)
    this.code = 409
  }
}

class InternalServerError extends HttpError {
  constructor(message) {
    super(message)
    this.code = 500
  }
}

module.exports = { 
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictedError,
  InternalServerError,
  HttpError,
}
