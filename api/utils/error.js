class CustomError extends Error{
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (statusCode, message) => 
    new CustomError(statusCode, message);