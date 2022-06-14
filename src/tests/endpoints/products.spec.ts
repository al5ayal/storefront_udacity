// import path from 'path';
import supertest from 'supertest';
import { app } from '../../app';
import config from '../../config';

// config.app.ENV = 'test';
// create a request object
const request = supertest(app);

describe('Test api/products endpoints', () => {
  it(`POST /api/products It should return 401`, async () => {
    const response = await request.post('/api/products');
    expect(response.status).toBe(401);
  });

  it(`GET /api/products It should return 200`, async () => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
  });

  it(`GET /api/products/id It should return 404`, async () => {
    console.log(config.app.ENV);
    const response = await request.get('/api/products/1');
    expect(response.status).toBe(404);
  });
});
