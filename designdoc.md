# Product Search API - Design Documentation

## API Structure and Endpoints

### Search Products Endpoint
- **Path**: `GET /products/search`
- **Query Parameters**:
  ```typescript
  {
    q: string;      // Search query (required, min 2 chars)
    limit?: number; // Results per page (default: 10)
    skip?: number;  // Results to skip (default: 0)
  }
  ```
- **Response Format**:
  ```typescript
  {
    total: number;   // Total matching results
    results: Product[]; // Array of matching products
  }
  ```

## Data Schema
```typescript
interface Product {
  id: number;      // Unique identifier
  title: string;   // Product name
  brand: string;   // Manufacturer/brand
  category: string; // Product category
  price: number;   // Price in USD
}
```

## Data Management
- Products stored in products.json
- Data seeded from DummyJSON API
- In-memory search operations

## Search Implementation

### Core Features
- Case-insensitive matching
- Matches against title and brand
- Server-side pagination
- Basic string pattern matching

### Ranking Algorithm
1. Exact matches in title (highest priority)
2. Partial matches in title
3. Matches in brand name

## Pagination Logic

### Implementation
- Cursor-based using `skip` and `limit`
- Default page size: 10 items
- Maximum results: 100 per request

### Edge Cases
- Query length < 2 chars → 400 error
- Invalid pagination params → 400 error
- No results → Empty array returned
- Skip beyond results → Empty array returned
