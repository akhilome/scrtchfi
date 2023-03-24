const request = require('supertest');
const { app } = require('./app');

describe('init', () => {
  it('should repsond appropriately for undefined routes', async () => {
    const res = await request(app).get('/invalid-route');

    expect(res.statusCode).toEqual(404);
  });
});
