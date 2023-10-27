class ValidationError extends Error {
    constructor(message) { 
        super(message); 
        this.name = 'ValidationError'; 
        this.statusCode = 400; 
    } 
}

class DatabaseError extends Error { 
    constructor(message) { 
        super(message); 
        this.name = 'DatabaseError'; 
        this.statusCode = 500; 
    } 
}

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof DatabaseError) {
        return res.status(err.statusCode).json({ message: err.message });
    } else {
        if (typeof err === 'string') {
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        } else {
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = errorHandler;
