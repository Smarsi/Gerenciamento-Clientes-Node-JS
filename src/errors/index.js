const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const ConflictError = require('./ConflictError');
const UnprocessableError = require('./UnprocessableError');

module.exports = {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ConflictError,
    UnprocessableError,
}