import { app } from './app';
import request from 'supertest';

describe('app', () => {
  test('should be defined', () => {
    expect(app).toBeDefined();
  });

  test('should return json when path equals "/" ', () => {
    return request(app.app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          cityName: '/api/ankara',
        });
      });
  });

  test('should return json when path equals "/api/:ankara" ', async () => {
    return request(app.app)
      .get('/api/ankara')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        if (Array.isArray(response.body)) {
          expect(response.body[0]).toBeInstanceOf(Object);
          expect(response.body[0]).toHaveProperty('date');
          expect(response.body[0]).toHaveProperty('day');
          expect(response.body[0]).toHaveProperty('imgSrc');
          expect(response.body[0]).toHaveProperty('description');
          expect(response.body[0]).toHaveProperty('degrees');
        }
      });
  });

  test('should status equal 404 when endpoint is undefined', async () => {
    return request(app.app)
      .get('/api/ankara/undefined')
      .expect(404)
      .then((response) => {
        expect(response.text).toEqual('Not Found');
      });
  });
});
