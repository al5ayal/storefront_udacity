// import path from 'path';
import supertest from 'supertest';
import { app } from '../../app';
import config from '../../config';

// config.app.ENV = 'test';
// create a request object
const request = supertest(app);

describe('Test api/category endpoints', () => {
  it(`POST /api/Categories It should return 401`, async () => {
    const response = await request.post('/api/category');
    expect(response.status).toBe(401);
  });

  it(`GET /api/category It should return 200`, async () => {
    const response = await request.get('/api/category');
    expect(response.status).toBe(200);
  });

  it(`GET /api/category/id It should return 404`, async () => {
    console.log(config.app.ENV);
    const response = await request.get('/api/category/1');
    expect(response.status).toBe(404);
  });
});
