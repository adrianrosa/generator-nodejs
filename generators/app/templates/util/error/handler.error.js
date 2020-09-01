module.exports = (err, res) => {
    const { statusCode, errorCode, message } = err;
    res.status(statusCode || 500).json({
        code: errorCode || 'internal.error',
        message
    });
};
