'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowRight, Package } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { companyDetails } from '@/lib/config';
import { ProductWithDetails } from '@/types';

interface ProductCardProps {
    product: ProductWithDetails;
    onEnquire?: (product: ProductWithDetails) => void;
}

export function ProductCard({ product, onEnquire }: ProductCardProps) {
    const whatsappMessage = encodeURIComponent(
        `Hi, I am interested in "${product.name}". Please share details and pricing.`
    );
    const whatsappLink = `https://wa.me/${companyDetails.whatsapp}?text=${whatsappMessage}`;

    const imageUrl = product.images[0]?.url;

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover shadow-sm">
            {/* Image */}
            <Link href={`/products/${product.id}`} className="block relative">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                            <Package className="w-16 h-16 mb-2 opacity-50" strokeWidth={1} />
                            <span className="text-xs text-slate-400 font-medium">No Image</span>
                        </div>
                    )}

                    {/* Category Badge */}
                    {product.category && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-[var(--color-primary)] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                {product.category.name}
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                {product.description && (
                    <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
                        {product.description.replace(/<[^>]*>/g, '').substring(0, 100)}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp-dark)] text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all">
                            <WhatsAppIcon className="w-4 h-4" />
                            WhatsApp
                        </button>
                    </a>
                    <button
                        onClick={() => onEnquire?.(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all"
                    >
                        <Mail className="w-4 h-4" />
                        Enquire
                    </button>
                </div>

                {/* View Details Link */}
                <Link
                    href={`/products/${product.id}`}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-[var(--color-accent)] py-2 border-t border-slate-100 -mx-5 px-5 -mb-5 mt-2 transition-colors group/link"
                >
                    View Full Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
