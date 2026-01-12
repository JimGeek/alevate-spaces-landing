import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandShowcase } from "@/components/BrandShowcase";
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
      <BrandShowcase brands={brands} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
