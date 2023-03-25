const axios = require('axios');
const request = require('supertest');
const { app } = require('./app');
const { mockDentalClinics, mockVetClinics } = require('./clinic/clinic.mock');

jest.mock('axios');

describe('init', () => {
  it('should repsond appropriately for undefined routes', async () => {
    const res = await request(app).get('/invalid-route');

    expect(res.statusCode).toEqual(404);
  });
});

describe('GET /clinics', () => {
  beforeEach(() => {
    axios.default.get
      .mockResolvedValueOnce({ data: mockDentalClinics })
      .mockResolvedValueOnce({ data: mockVetClinics });
  });

  it('should return an unfiltered list of clinics', async () => {
    const res = await request(app).get('/clinics');

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('should return only clinics in Florida', async () => {
    const res = await request(app).get('/clinics?state=FL');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  it('should return clinics in FL at a specified time', async () => {
    const res = await request(app).get('/clinics?state=FL&from=12:00&to=14:00');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('should return clinics by name', async () => {
    const res = await request(app).get('/clinics?name=Good%20health%20home');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  it('should return clinics by name & state', async () => {
    const res = await request(app).get('/clinics?name=Good%20health%20home&state=alaska');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('should return clinics at end time', async () => {
    const res = await request(app).get('/clinics?to=14:00');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
  });
});
