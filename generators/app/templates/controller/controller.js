const service = require('../services/service.js');

exports.index = (req, res, next) => {
    try {
        const data = service.getData();
        res.status(200).json({ data: data });
    } catch (e) {
        // This invocation will be handled by the method handlerError in the app.js
        next(e);
    }
};
