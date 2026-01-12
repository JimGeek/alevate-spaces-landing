import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandCard } from "@/components/BrandCard";
import { Footer } from "@/components/Footer";
import { Brand } from "@/types";

export const revalidate = 60;

async function getBrands(): Promise<Brand[]> {
  // In a real scenario, this would fetch from the Django API.
  // For now, we'll try to fetch, and if it fails (e.g., during build if backend isn't running), return mock data or empty.
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${apiUrl}/api/v1/brands/public/brands/`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch brands: ${res.status}`);
    const json = await res.json();

    // Handle EnvelopeJSONRenderer ( { success: true, data: [...] } )
    const payload = json.data !== undefined ? json.data : json;
    const brands = Array.isArray(payload) ? payload : (payload.results || []);

    console.log(`[Alevate] Fetched ${brands.length} brands from ${apiUrl}`);
    return brands;
  } catch (error) {
    console.warn("Using mock brands data. Error:", error);
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
      <section id="brands" className="py-24 container mx-auto px-6">
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
