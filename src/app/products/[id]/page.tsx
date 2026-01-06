import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getProductById } from '@/lib/data';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;

    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-slate-900">Products</Link>
                    <span>/</span>
                    {product.category && (
                        <>
                            <Link href={`/categories/${product.category.id}`} className="hover:text-slate-900">
                                {product.category.name}
                            </Link>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>

                <ProductDetailClient product={product} />
            </div>
        </div>
    );
}
