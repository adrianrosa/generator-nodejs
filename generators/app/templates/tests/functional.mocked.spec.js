const supertest = require('supertest');

jest.mock('supertest', () => ({
    get: jest.fn().mockResolvedValue({
        statusCode: 200,
        body: {
            data: 'Hello world'
        }
    })
    // Add here: post, put, patch, delete ...
}));

describe('Functional Test Suite (MOCKED)', () => {
    it('Test for endpoint GET (MOCKED)', async () => {
        const response = await supertest.get('/');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
    });
});
