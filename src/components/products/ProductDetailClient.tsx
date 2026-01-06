'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EnquireModal } from '@/components/ui/EnquireModal';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { companyDetails } from '@/lib/config';
import { ProductWithDetails } from '@/types';

interface ProductDetailClientProps {
    product: ProductWithDetails;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const whatsappMessage = encodeURIComponent(
        `Hi, I am interested in ${product.name}. Can you please share more details and pricing?`
    );
    const whatsappLink = `https://wa.me/${companyDetails.whatsapp}?text=${whatsappMessage}`;

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        {product.images[selectedImage] ? (
                            <Image
                                src={product.images[selectedImage].url}
                                alt={product.name}
                                width={800}
                                height={800}
                                className="w-full h-full object-contain p-6"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
                                <Package className="w-24 h-24 mb-4" strokeWidth={1} />
                                <span className="text-sm text-slate-400">No Image Available</span>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${selectedImage === idx
                                            ? 'border-[var(--color-accent)] shadow-md ring-2 ring-[var(--color-accent)]/20'
                                            : 'border-slate-200 hover:border-slate-400'
                                        }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={`${product.name} thumbnail ${idx + 1}`}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {product.category && (
                        <Link
                            href={`/categories/${product.category.id}`}
                            className="inline-block text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider bg-orange-50 px-4 py-2 rounded-full hover:bg-orange-100 transition-colors"
                        >
                            {product.category.name}
                        </Link>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{product.name}</h1>

                    {product.brand && (
                        <p className="text-sm text-slate-500">
                            Brand: <span className="font-semibold text-slate-700">{product.brand.name}</span>
                        </p>
                    )}

                    {product.description && (
                        <div
                            className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    )}

                    {/* CTA Buttons - Always Visible and Prominent */}
                    <div className="pt-6 space-y-4 border-t border-slate-200">
                        <p className="text-sm text-slate-600 font-semibold">Get a quote or more details:</p>

                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="secondary" size="lg" className="w-full gap-3 bg-[#25D366] text-white hover:bg-[#128c7e] border-0 shadow-lg text-base font-bold">
                                <WhatsAppIcon className="w-6 h-6" />
                                Enquire on WhatsApp
                            </Button>
                        </a>

                        <Button
                            variant="accent"
                            size="lg"
                            className="w-full gap-3 shadow-lg text-base font-bold"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Mail className="w-5 h-5" />
                            Enquire via Email
                        </Button>

                        <a href={`tel:${companyDetails.phone.primary}`} className="block">
                            <Button variant="outline" size="lg" className="w-full gap-3 text-base">
                                <Phone className="w-5 h-5" />
                                Call Us Directly
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            <EnquireModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
            />
        </>
    );
}
