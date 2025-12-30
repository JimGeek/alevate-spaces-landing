import { Navbar } from "@/components/Navbar";
import { Founder } from "@/types";
import { Quote, Linkedin, Twitter } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getFounders(): Promise<Founder[]> {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/founders/", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch founders");
        return res.json();
    } catch (error) {
        console.warn("Using mock founders data", error);
        return [
            {
                id: 1,
                name: "Alex V.",
                role: "CEO & Visionary",
                photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                bio: "Serial entrepreneur with a passion for disrupting traditional industries. Leading the vision of Alevate Spaces.",
                vision_quote: "We are crafting the future of living.",
                order: 1
            }
        ];
    }
}

export default async function FoundersPage() {
    const founders = await getFounders();

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Visionaries behind the <br />
                        <span className="text-primary">Giga-Scale Revolution</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Meet the minds engineering an entire ecosystem of D2C brands to redefine how the world builds and lives.
                    </p>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-16 bg-secondary/5 border-y border-border/50">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Why we are building this.</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            The construction and interior industry has been fragmented for too long. We saw an opportunity to bring everything under one roof—driven by technology, design, and manufacturing excellence.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            At Alevate Spaces, we aren't just creating products; we are curating lifestyles. Our vertical integration allows us to maintain uncompromising quality while delivering value that was previously impossible.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden bg-muted">
                        {/* Abstract visual or office shot */}
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                            alt="Office Philosophy"
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>
                </div>
            </section>

            {/* Founders Profiles */}
            <section className="py-24 container mx-auto px-6">
                <div className="space-y-32">
                    {founders.map((founder, index) => (
                        <div key={founder.id} className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Image Column */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-primary/20 rounded-2xl md:rounded-[2rem] transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                                <div className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-2xl md:rounded-[2rem] border border-border/50">
                                    <img
                                        src={founder.photo}
                                        alt={founder.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="w-full md:w-1/2 pt-8">
                                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{founder.name}</h2>
                                <p className="text-xl text-primary font-medium mb-8">{founder.role}</p>

                                {founder.vision_quote && (
                                    <div className="mb-8 relative pl-6 border-l-4 border-primary/50 italic text-xl md:text-2xl text-foreground/90 leading-normal">
                                        <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/20 fill-primary/20" />
                                        "{founder.vision_quote}"
                                    </div>
                                )}

                                <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed mb-8">
                                    <p>{founder.bio}</p>
                                </div>

                                <div className="flex items-center space-x-6">
                                    {founder.linkedin_url && (
                                        <a href={founder.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Linkedin size={28} />
                                        </a>
                                    )}
                                    {founder.twitter_url && (
                                        <a href={founder.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Twitter size={28} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="py-12 border-t border-border bg-secondary/5">
                <div className="container px-6 text-center">
                    <h3 className="text-2xl font-bold mb-8">Ready to Elevate?</h3>
                    <p className="text-muted-foreground mb-8">Contact us at hello@alevatespaces.com</p>
                    <p className="text-sm text-muted-foreground/60">© 2025 Alevate Spaces Pvt Ltd. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
