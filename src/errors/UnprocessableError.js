class UnprocessableError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableError';
        this.statusCode = 404;
    }
}

module.exports = UnprocessableError;