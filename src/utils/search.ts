import { Product } from '../types/product';

export function searchProducts(
    products: Product[],
    query: string,
    limit: number,
    skip: number
): Product[] {
    const q = query.toLowerCase();

    let results = products.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
    );

    results.sort((a, b) => {
        const aStarts = a.title?.toLowerCase().startsWith(q) ? 1 : 0;
        const bStarts = b.title?.toLowerCase().startsWith(q) ? 1 : 0;
        return bStarts - aStarts;
    });

    return results.slice(skip, skip + limit);
}
