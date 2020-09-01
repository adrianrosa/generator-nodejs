const model = require('../models/model.js');
// const { CustomError } = require('../utils/error/custom.error');

exports.getData = () => {
    // Here: validations and http calls
    // if (someCondition) {
    //     throw new CustomError(500, 'code', 'message');
    // }
    return model.getData();
};
