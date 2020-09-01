const model = require('../../models/model');

describe('Unit Test Suite', () => {
    it('Test for model', () => {
        const result = 'Hello world';
        expect(model.getData()).toEqual(result);
    });
});
