class CustomError extends Error {
    constructor(statusCode, errorCode, message) {
        super();
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}

module.exports = {
    CustomError
};
