const request = require('supertest');
const app = require('../../app');

describe('Functional Test Suite', () => {
    it('Test for endpoint GET', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
    });
});
