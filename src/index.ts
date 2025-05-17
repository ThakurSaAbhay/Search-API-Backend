import express, { Request, Response, RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { Product } from './types/product';
import { searchProducts } from './utils/search';

const app = express();
const PORT = 3000;

const dataPath = path.join(__dirname, 'data', 'products.json');
const products: Product[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

app.get('/products/search', ((req: Request, res: Response) => {
  const { q, limit = '10', skip = '0' } = req.query;

  if (typeof q !== 'string' || q.length < 2) {
    return res.status(400).json({ error: 'Query (q) must be at least 2 characters long.' });
  }

  const limitNum = parseInt(limit as string, 10);
  const skipNum = parseInt(skip as string, 10);

  if (isNaN(limitNum) || isNaN(skipNum) || limitNum < 1 || skipNum < 0) {
    return res.status(400).json({ error: 'Invalid limit or skip parameter.' });
  }

  const results = searchProducts(products, q, limitNum, skipNum);
  res.json({ total: results.length, results });
}) as RequestHandler);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

let server: any;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app, server };
