'use client';

import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { companyDetails } from '@/lib/config';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setError('Something went wrong. Please try again or call us directly.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Have questions about our products or need a quote? Reach out to us and our team will get back to you promptly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Get in Touch</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-orange-50 rounded-lg text-[var(--color-accent)]">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                                        <p className="text-slate-600 text-sm">{companyDetails.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-orange-50 rounded-lg text-[var(--color-accent)]">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                                        <p className="text-slate-600 text-sm">
                                            <a href={`tel:${companyDetails.phone.primary}`} className="hover:text-[var(--color-accent)]">
                                                {companyDetails.phone.primary}
                                            </a>
                                            <br />
                                            <a href={`tel:${companyDetails.phone.secondary}`} className="hover:text-[var(--color-accent)]">
                                                {companyDetails.phone.secondary}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-orange-50 rounded-lg text-[var(--color-accent)]">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                                        <p className="text-slate-600 text-sm">
                                            <a href={`mailto:${companyDetails.email}`} className="hover:text-[var(--color-accent)]">
                                                {companyDetails.email}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-orange-50 rounded-lg text-[var(--color-accent)]">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Business Hours</h3>
                                        <p className="text-slate-600 text-sm">
                                            Monday - Saturday: 9:00 AM - 7:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href={`https://wa.me/${companyDetails.whatsapp}?text=${encodeURIComponent('Hi, I would like to enquire about your industrial products.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <div className="bg-[#25D366] text-white rounded-xl p-6 text-center hover:bg-[#128c7e] transition-colors shadow-lg">
                                <p className="font-bold text-lg">Chat with us on WhatsApp</p>
                                <p className="text-sm opacity-90">Quick response guaranteed</p>
                            </div>
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Send us a Message</h2>

                        {success ? (
                            <div className="text-center py-12">
                                <div className="text-[var(--color-accent)] text-5xl mb-4">✓</div>
                                <p className="font-bold text-xl text-slate-900 mb-2">Message Sent!</p>
                                <p className="text-slate-500">We will get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Your Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)]"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)]"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)]"
                                            placeholder="+91 98493 23052"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Your Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={5}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)]"
                                        placeholder="Tell us about your requirements..."
                                    ></textarea>
                                </div>

                                {error && <p className="text-sm text-red-500">{error}</p>}

                                <Button type="submit" variant="accent" size="lg" className="w-full gap-2" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" /> Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
