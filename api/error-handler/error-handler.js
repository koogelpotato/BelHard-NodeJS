function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        default:
            return res.status(500).json({ message: err.message });
    }
}

module.exports = errorHandler;
