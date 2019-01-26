class ConektaError extends Error {
  constructor({ message, httpStatusCode }) {
    super(message)

    this.httpStatusCode = httpStatusCode
    this.name = this.constructor.name

    Error.captureStackTrace(this)
  }
}

module.exports = ConektaError
