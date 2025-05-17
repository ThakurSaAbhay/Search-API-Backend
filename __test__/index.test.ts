import request from 'supertest';
import { app } from '../src/index';
import * as searchUtils from '../src/utils/search';

// Mock the fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => JSON.stringify([
    {
      id: 1,
      title: "Test Product",
      brand: "Test Brand",
      category: "test",
      price: 9.99
    }
  ]))
}));

// Mock the search function
jest.spyOn(searchUtils, 'searchProducts');

describe('API Endpoints', () => {
  describe('GET /products/search', () => {
    it('should return 400 if query is less than 2 characters', async () => {
      const response = await request(app)
        .get('/products/search')
        .query({ q: 'a' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Query (q) must be at least 2 characters long.');
    });

    it('should return 400 if limit is invalid', async () => {
      const response = await request(app)
        .get('/products/search')
        .query({ q: 'test', limit: '0' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid limit or skip parameter.');
    });

    it('should return 400 if skip is invalid', async () => {
      const response = await request(app)
        .get('/products/search')
        .query({ q: 'test', skip: '-1' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid limit or skip parameter.');
    });

    it('should return search results', async () => {
      const response = await request(app)
        .get('/products/search')
        .query({ q: 'test', limit: '10', skip: '0' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('results');
      expect(Array.isArray(response.body.results)).toBe(true);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });
  });
});