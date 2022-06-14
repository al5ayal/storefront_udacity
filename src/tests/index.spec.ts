// import path from 'path';
import supertest from 'supertest';
import { app } from '../app';

// create a request object
const request = supertest(app);

describe('Test main endpoints response', () => {
  it(`Test /api endpoint`, async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});