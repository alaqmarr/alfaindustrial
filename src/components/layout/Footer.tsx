'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { companyDetails } from '@/lib/config';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/categories', label: 'Categories' },
        { href: '/contact', label: 'Contact Us' },
    ];

    const productCategories = [
        { href: '/categories/ball-valves', label: 'Ball Valves' },
        { href: '/categories/butterfly-valves', label: 'Butterfly Valves' },
        { href: '/categories/gate-valves', label: 'Gate Valves' },
        { href: '/categories/pneumatic-fittings', label: 'Pneumatic Fittings' },
    ];

    return (
        <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 industrial-grid"></div>
            </div>

            {/* Top CTA Section */}
            <div className="relative border-b border-slate-800">
                <div className="container mx-auto px-6 py-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Need Industrial Supplies?</h3>
                            <p className="text-slate-400">Get expert advice and competitive quotes on all your requirements.</p>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href={`https://wa.me/${companyDetails.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#128c7e] transition-colors shadow-lg"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                                WhatsApp Us
                            </a>
                            <a
                                href={`tel:${companyDetails.phone.primary}`}
                                className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-6 py-3 rounded-full hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <Image
                                src="/logo.png"
                                alt="Alfa Industrial Products"
                                width={180}
                                height={50}
                                className="h-12 w-auto object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm leading-relaxed mb-6 text-slate-400">
                            For over 20 years, we've been a trusted partner for industrial valves, pipe fittings, and pneumatic components. Quality products, competitive prices, and reliable service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wide">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <ChevronRight className="w-4 h-4 text-[var(--color-accent)] group-hover:translate-x-1 transition-transform" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wide">Our Products</h4>
                        <ul className="space-y-3">
                            {productCategories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <ChevronRight className="w-4 h-4 text-[var(--color-accent)] group-hover:translate-x-1 transition-transform" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wide">Contact Us</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="flex items-start gap-3 group">
                                    <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                                        {companyDetails.address}
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${companyDetails.phone.primary}`} className="flex items-center gap-3 group">
                                    <Phone className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                                    <div className="text-sm">
                                        <span className="text-slate-400 group-hover:text-white transition-colors block">{companyDetails.phone.primary}</span>
                                        <span className="text-slate-500 text-xs">{companyDetails.phone.secondary}</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${companyDetails.email}`} className="flex items-center gap-3 group">
                                    <Mail className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                                        {companyDetails.email}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-slate-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <p>&copy; {currentYear} {companyDetails.name}. All rights reserved.</p>
                        <p className="text-xs">
                            Serving Hyderabad, Secunderabad & Pan India
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
