// const { CustomError } = require('../utils/error/custom.error');

const validation = (req, res, next) => {
    // Here: validate params of the request or auth
    // if (someCondition) {
    //     throw new CustomError(400, 'code', 'message');
    // }
    next();
};

module.exports = {
    validation
};
