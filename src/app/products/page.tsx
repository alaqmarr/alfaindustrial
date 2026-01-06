import { Suspense } from 'react';
import { getProducts, getAllCategories } from '@/lib/data';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{
        category?: string;
        search?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const { category, search } = resolvedParams;

    const products = await getProducts({
        categoryId: category,
        search: search,
    });

    const categories = await getAllCategories();

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Our Products</h1>
                    <p className="text-slate-500 mt-2">
                        Explore our extensive range of industrial valves, fittings, and pneumatic components.
                    </p>
                </div>

                <ProductFilters categories={categories} />

                <Suspense fallback={<div>Loading Products...</div>}>
                    <ProductGrid products={products} />
                </Suspense>
            </div>
        </div>
    );
}
