// import path from 'path';
import supertest from 'supertest';
import { app } from '../../app';
import config from '../../config';

// config.app.ENV = 'test';
// create a request object
const request = supertest(app);

describe('Test api/users endpoints', () => {
  it(`POST /api/users It should return 401`, async () => {
    const response = await request.post('/api/users');
    expect(response.status).toBe(401);
  });

  it(`GET /api/users It should return 401`, async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(401);
  });

  it(`GET /api/users/id It should return 401`, async () => {
    console.log(config.app.ENV);
    const response = await request.get('/api/users/id');
    expect(response.status).toBe(401);
  });
});
