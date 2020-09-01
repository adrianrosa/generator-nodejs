const service = require('../../services/service');

describe('Integration Test Suite', () => {
    it('Test for service', () => {
        const result = 'Hello world';
        expect(service.getData()).toEqual(result);
    });
});
