const errorResponse = (err, res) => {
    const { name, message, statusCode } = err;
    res.status(statusCode).json({
        error: {
            name,
            message
        }
    });
};

module.exports = (err, req, res, next) => {
    if (err) {
        errorResponse(err, res);
    } else {
        next();
    }
};