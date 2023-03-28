class UnprocessableError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableError';
        this.statusCode = 422;
    }
}

module.exports = UnprocessableError;