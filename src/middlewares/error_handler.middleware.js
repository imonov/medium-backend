export const ErrorHandlerMiddleware = (err, req, res, next) => {
    if (err.isException) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
        });
    }

    res.status(500).json({
        success: false,
        message: "server xatoligi",
    });
};
