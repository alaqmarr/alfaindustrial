'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { EnquireModal } from '@/components/ui/EnquireModal';
import { ProductWithDetails } from '@/types';

interface ProductGridProps {
    products: ProductWithDetails[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const [selectedProduct, setSelectedProduct] = useState<ProductWithDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnquire = (product: ProductWithDetails) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const ctaClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500">
                <p>No products found.</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEnquire={handleEnquire}
                    />
                ))}
            </div>

            <EnquireModal
                isOpen={isModalOpen}
                onClose={ctaClose}
                product={selectedProduct}
            />
        </>
    );
}
