'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { companyDetails } from '@/lib/config';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/categories', label: 'Categories' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
            {/* Top Bar */}
            <div className="hidden md:block bg-slate-900 text-slate-300 text-xs">
                <div className="container mx-auto px-6 h-9 flex items-center justify-between">
                    <p>Trusted Industrial Partner Since 2000 • Quality Guaranteed</p>
                    <div className="flex items-center gap-6">
                        <a href={`tel:${companyDetails.phone.primary}`} className="hover:text-white transition-colors flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            {companyDetails.phone.primary}
                        </a>
                        <a href={`mailto:${companyDetails.email}`} className="hover:text-white transition-colors">
                            {companyDetails.email}
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/logo.png"
                            alt="Alfa Industrial Products"
                            width={180}
                            height={50}
                            className="h-10 md:h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-1/2 transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href={`tel:${companyDetails.phone.primary}`}>
                            <Button variant="accent" size="md" className="font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow rounded-full px-6">
                                <Phone className="w-4 h-4 mr-2" />
                                Call Us
                            </Button>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 border-t border-slate-200' : 'max-h-0'
                    }`}
            >
                <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-[var(--color-accent)] hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 mt-2 border-t border-slate-200">
                        <a href={`tel:${companyDetails.phone.primary}`} className="block">
                            <Button variant="accent" className="w-full font-semibold">
                                <Phone className="w-4 h-4 mr-2" />
                                Call {companyDetails.phone.primary}
                            </Button>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
