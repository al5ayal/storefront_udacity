// import path from 'path';
import supertest from 'supertest';
import { app } from '../../app';
import config from '../../config';

// config.app.ENV = 'test';
// create a request object
const request = supertest(app);

describe('Test api/orders endpoints', () => {
  it(`POST /api/orders It should return 401`, async () => {
    const response = await request.post('/api/orders');
    expect(response.status).toBe(401);
  });

  it(`PUT /api/orders It should return 401`, async () => {
    const response = await request.put('/api/orders/1');
    expect(response.status).toBe(401);
  });

  it(`DELETE /api/orders It should return 401`, async () => {
    const response = await request.delete('/api/orders/1');
    expect(response.status).toBe(401);
  });

  it(`GET /api/orders It should return 401`, async () => {
    const response = await request.get('/api/orders');
    expect(response.status).toBe(401);
  });

  it(`GET /api/orders/id It should return 401`, async () => {
    console.log(config.app.ENV);
    const response = await request.get('/api/orders/1');
    expect(response.status).toBe(401);
  });
});
