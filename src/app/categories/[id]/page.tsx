import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getCategoryById, getProductsByCategoryId } from '@/lib/data';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CategoryDetailPage({ params }: PageProps) {
    const { id } = await params;

    const category = await getCategoryById(id);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategoryId(id);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <span>/</span>
                    <Link href="/categories" className="hover:text-slate-900">Categories</Link>
                    <span>/</span>
                    <span className="text-slate-900 font-medium">{category.name}</span>
                </nav>

                <div className="mb-12">
                    <Link href="/categories">
                        <Button variant="ghost" size="sm" className="mb-4">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Categories
                        </Button>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{category.name}</h1>
                    {category.description && (
                        <p className="text-slate-500 max-w-3xl">{category.description}</p>
                    )}
                    <p className="text-sm text-slate-400 mt-2">{category._count.products} products in this category</p>
                </div>

                <ProductGrid products={products} />
            </div>
        </div>
    );
}
