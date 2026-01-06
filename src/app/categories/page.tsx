import { Suspense } from 'react';
import { getAllCategories } from '@/lib/data';
import { CategoryGrid } from '@/components/ui/CategoryGrid';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
    const categories = await getAllCategories();

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Product Categories</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Browse our comprehensive range of industrial valves, fittings, pneumatic components, and more.
                    </p>
                </div>

                <Suspense fallback={<div className="text-center">Loading categories...</div>}>
                    <CategoryGrid categories={categories} />
                </Suspense>
            </div>
        </div>
    );
}
