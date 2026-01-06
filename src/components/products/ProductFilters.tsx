'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';
import { CategoryWithCount } from '@/types';

interface ProductFiltersProps {
    categories: CategoryWithCount[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [categoryId, setCategoryId] = useState(searchParams.get('category') || '');

    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (search) params.set('search', search);
        else params.delete('search');

        // Reset page if we had pagination? (not implemented yet)
        router.push(`/products?${params.toString()}`);
    }, [search, searchParams, router]);

    const handleCategoryChange = (newCatId: string) => {
        setCategoryId(newCatId);
        const params = new URLSearchParams(searchParams.toString());

        if (newCatId) params.set('category', newCatId);
        else params.delete('category');

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search */}
                <form onSubmit={handleSearch} className="flex w-full md:w-auto flex-1 gap-2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)]"
                    />
                    <Button type="submit" variant="secondary">
                        <Search className="w-4 h-4" />
                    </Button>
                </form>

                {/* Category Filter */}
                <div className="w-full md:w-64">
                    <select
                        value={categoryId}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] bg-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name} ({cat._count.products})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
