import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandCard } from "@/components/BrandCard";
import { Footer } from "@/components/Footer";
import { Brand } from "@/types";

export const dynamic = 'force-dynamic';

async function getBrands(): Promise<Brand[]> {
  // In a real scenario, this would fetch from the Django API.
  // For now, we'll try to fetch, and if it fails (e.g., during build if backend isn't running), return mock data or empty.
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${apiUrl}/api/brands/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch brands");
    return res.json();
  } catch (error) {
    console.warn("Using mock brands data", error);
    return [];
  }
}

export default async function Home() {
  const brands = await getBrands();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero />

      {/* Brands Section */}
      <section id="brands" className="py-24 container px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
