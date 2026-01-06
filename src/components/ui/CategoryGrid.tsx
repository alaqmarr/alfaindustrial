'use client';

import Link from 'next/link';
import { CategoryWithCount } from '@/types';
import { ArrowRight, Package } from 'lucide-react';

interface CategoryGridProps {
    categories: CategoryWithCount[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 industrial-grid"></div>
                    </div>

                    {/* Accent Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-accent)]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative p-8 flex flex-col min-h-[200px]">
                        {/* Icon */}
                        <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                            <Package className="w-6 h-6 text-[var(--color-accent)]" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                                {category.name}
                            </h3>
                            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                {category.description || 'Explore our high-quality industrial range.'}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
                            <span className="text-xs font-semibold text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full">
                                {category._count.products} Products
                            </span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] group-hover:gap-3 transition-all">
                                Browse
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
