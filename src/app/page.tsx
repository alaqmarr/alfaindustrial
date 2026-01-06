import { Suspense } from 'react';
import { HeroCarousel } from '@/components/ui/HeroCarousel';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CategoryGrid } from '@/components/ui/CategoryGrid';
import { getRandomProducts, getAllCategories } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, Sparkles, Grid3X3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getRandomProducts(6);
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section>
        <HeroCarousel />
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                <span className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">Featured Collection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Top Industrial Products</h2>
              <p className="text-slate-500 max-w-xl">
                Discover our premium selection of valves, fittings, and pneumatic components trusted by industries across India.
              </p>
            </div>
            <Link href="/products" className="hidden md:block shrink-0">
              <Button variant="outline" className="gap-2 rounded-full px-6 group">
                View All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-400">Loading Products...</div>}>
            <ProductGrid products={products} />
          </Suspense>

          <div className="mt-12 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full gap-2 rounded-full">
                View All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl translate-y-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Grid3X3 className="w-5 h-5 text-[var(--color-accent)]" />
              <span className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Browse by Category</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Find exactly what you need from our comprehensive range of industrial products, organized for easy navigation.
            </p>
          </div>

          <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-400">Loading Categories...</div>}>
            <CategoryGrid categories={categories} />
          </Suspense>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '5000+', label: 'Products' },
              { value: '1000+', label: 'Happy Clients' },
              { value: '100%', label: 'Quality Assured' },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[var(--color-accent)] transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
