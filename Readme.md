# Product Search API

A Node.js/Express REST API that provides product search functionality with pagination.

## Features

- Search products by title or brand
- Case-insensitive search
- Pagination support
- Prioritized matching (matches at start of title appear first)
- Docker support

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

### Development

Run in development mode with hot-reload:
```sh
npm run dev
```

### Building

Build the TypeScript project:
```sh
npm run build
```

### Testing

Run the test suite:
```sh
npm test
```

### Seeding Data

Populate the products database:
```sh
npm run seed
```

## API Reference

### Search Products

```
GET /products/search
```

**Query Parameters:**
- `q` (required) - Search query (minimum 2 characters)
- `limit` (optional) - Number of results per page (default: 10)
- `skip` (optional) - Number of results to skip (default: 0)

**Response:**
```json
{
  "total": number,
  "results": Product[]
}
```

**Example:**
```sh
curl "http://localhost:3000/products/search?q=apple&limit=10&skip=0"
```

## Docker Support

Build the Docker image:
```sh
docker build -t product-search-api .
```

Run the container:
```sh
docker run -p 3000:3000 product-search-api
```

## Project Structure

- `src/` - Source code
  - `index.ts` - Express application setup
  - `utils/search.ts` - Search implementation
  - `types/product.ts` - TypeScript interfaces
  - `data/products.json` - Product database
- `__test__/` - Test files
- `scripts/` - Utility scripts

## Technologies

- TypeScript
- Express.js
- Jest
- Supertest
- Docker