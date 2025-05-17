import { searchProducts } from '../src/utils/search';
import { Product } from '../src/types/product';

describe('searchProducts', () => {
  const testProducts: Product[] = [
    {
      id: 1,
      title: "Apple MacBook",
      brand: "Apple",
      category: "laptops",
      price: 1299.99
    },
    {
      id: 2,
      title: "Samsung Phone",
      brand: "Samsung",
      category: "phones",
      price: 799.99
    },
    {
      id: 3,
      title: "Apple iPhone",
      brand: "Apple",
      category: "phones",
      price: 999.99
    }
  ];

  it('should filter products by title', () => {
    const results = searchProducts(testProducts, 'macbook', 10, 0);
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Apple MacBook');
  });

  it('should filter products by brand', () => {
    const results = searchProducts(testProducts, 'apple', 10, 0);
    expect(results).toHaveLength(2);
    expect(results.every(p => p.brand === 'Apple')).toBe(true);
  });

  it('should respect limit parameter', () => {
    const results = searchProducts(testProducts, 'apple', 1, 0);
    expect(results).toHaveLength(1);
  });

  it('should respect skip parameter', () => {
    const results = searchProducts(testProducts, 'apple', 10, 1);
    expect(results).toHaveLength(1);
  });

  it('should be case insensitive', () => {
    const results = searchProducts(testProducts, 'APPLE', 10, 0);
    expect(results).toHaveLength(2);
  });

  it('should prioritize matches at start of title', () => {
    const results = searchProducts(testProducts, 'apple', 10, 0);
    expect(results[0].title).toMatch(/^Apple/);
  });

  it('should return empty array if no matches', () => {
    const results = searchProducts(testProducts, 'nonexistent', 10, 0);
    expect(results).toHaveLength(0);
  });
});