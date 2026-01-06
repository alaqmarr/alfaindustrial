'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Award, Truck } from 'lucide-react';
import Link from 'next/link';

export function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    const slides = [
        {
            id: 1,
            eyebrow: 'Premium Quality',
            title: 'Industrial Valves',
            highlight: '& Fittings',
            description: 'High-performance solutions trusted by manufacturers across India for over 20 years.',
            ctaLink: '/products',
            ctaText: 'Browse Products',
        },
        {
            id: 2,
            eyebrow: 'Complete Range',
            title: 'Pneumatic',
            highlight: 'Components',
            description: 'Cylinders, FRL units, and fittings to power your automation systems.',
            ctaLink: '/categories',
            ctaText: 'View Categories',
        },
        {
            id: 3,
            eyebrow: 'ISO Certified',
            title: 'Quality',
            highlight: 'Guaranteed',
            description: 'Rigorous quality control and reliable service. Your trusted industrial partner.',
            ctaLink: '/contact',
            ctaText: 'Contact Us',
        },
    ];

    const features = [
        { icon: Shield, text: '20+ Years Trust' },
        { icon: Award, text: 'Quality Certified' },
        { icon: Truck, text: 'Pan India Delivery' },
    ];

    return (
        <section className="relative bg-[var(--color-primary)] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 industrial-grid"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="embla relative" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, index) => (
                        <div className="flex-[0_0_100%] min-w-0" key={slide.id}>
                            <div className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
                                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                                    <div className="max-w-3xl">
                                        {/* Eyebrow */}
                                        <div
                                            className={`inline-flex items-center gap-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full px-4 py-2 mb-6 transition-all duration-500 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                                            <span className="text-[var(--color-accent)] text-sm font-semibold tracking-wide">{slide.eyebrow}</span>
                                        </div>

                                        {/* Title */}
                                        <h1
                                            className={`text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 transition-all duration-700 delay-100 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                        >
                                            {slide.title}<br />
                                            <span className="text-[var(--color-accent)]">{slide.highlight}</span>
                                        </h1>

                                        {/* Description */}
                                        <p
                                            className={`text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed transition-all duration-700 delay-200 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                        >
                                            {slide.description}
                                        </p>

                                        {/* CTA */}
                                        <div
                                            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                        >
                                            <Link href={slide.ctaLink} className="btn-primary text-lg group">
                                                {slide.ctaText}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-2 text-white border-2 border-white/20 hover:bg-white/10 px-6 py-3 rounded-full font-semibold transition-all"
                                            >
                                                Get a Quote
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20">
                <button
                    onClick={scrollPrev}
                    className="p-3 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20">
                <button
                    onClick={scrollNext}
                    className="p-3 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white hover:bg-white/10 transition-all"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${selectedIndex === index
                                ? 'w-10 bg-[var(--color-accent)]'
                                : 'w-3 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>

            {/* Bottom Feature Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 py-5">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-white/80">
                                <feature.icon className="w-5 h-5 text-[var(--color-accent)]" />
                                <span className="text-sm font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
