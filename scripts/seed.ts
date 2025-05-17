import fs from 'fs';
import path from 'path';
import { Product } from '../src/types/product';;

interface DummyJsonResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function fetchAndSeedProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = (await response.json()) as DummyJsonResponse;



    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Invalid product data received');
    }

    const cleaned: Product[] = data.products.map((p: Product) => ({
      id: p.id,
      title: p.title,
      brand: p.brand,
      category: p.category,
      price: p.price,
    }));

    const dirPath = path.join(__dirname, '../src/data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, 'products.json');
    fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2));

    console.log(`Seeded ${cleaned.length} products to products.json`);
  } catch (err) {
    console.error('Error fetching or writing products:', err);
  }
}

fetchAndSeedProducts();
