import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Founder } from "@/types";
import { Quote, Linkedin, Twitter, ArrowRight, Hammer, Lightbulb, Users } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getFounders(): Promise<Founder[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/api/founders/`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch founders");
        const data = await res.json();

        // Enrich with mock expertise for demo purposes (since backend doesn't have it yet)
        return data.map((f: Founder) => ({
            ...f,
            expertise: f.id === 1
                ? ["Strategic Vision", "Product Innovation", "Ecosystem Design"]
                : ["Operational Excellence", "Supply Chain", "Manufacturing"]
        }));
    } catch (error) {
        console.warn("Using mock founders data", error);
        return [
            {
                id: 1,
                name: "Alex V.",
                role: "CEO & Visionary",
                photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                bio: "Serial entrepreneur with a passion for disrupting traditional industries. Leading the vision of Alevate Spaces to revolutionize how people build and live.",
                vision_quote: "We are crafting the future of living, one space at a time.",
                linkedin_url: "#",
                twitter_url: "#",
                order: 1,
                expertise: ["Strategic Vision", "Product Innovation", "Ecosystem Design"]
            },
            {
                id: 2,
                name: "Sarah Chen",
                role: "CTO & Architect",
                photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                bio: "Tech leader focusing on integrating smart construction technologies with sustainable design principles.",
                vision_quote: "Technology should be invisible but impactful in every home we build.",
                linkedin_url: "#",
                order: 2,
                expertise: ["Smart Tech", "Sustainable Architecture", "R&D"]
            }
        ];
    }
}

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => (
    <div className="group relative overflow-hidden rounded-xl bg-secondary/5 border border-white/5 hover:border-primary/30 transition-all duration-300">
        <div className="aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
            <img src={image} alt={name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="p-4 bg-background/80 backdrop-blur-sm absolute bottom-0 left-0 right-0 border-t border-white/5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-foreground">{name}</h3>
            <p className="text-xs text-primary uppercase tracking-wider">{role}</p>
        </div>
    </div>
);

export default async function FoundersPage() {
    const founders = await getFounders();

    const teamMembers = [
        { name: "David Kim", role: "Head of Manufacturing", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" },
        { name: "Elena Rodriguez", role: "Lead Interior Designer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" },
        { name: "Marcus Johnson", role: "Supply Chain Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
        { name: "Priya Patel", role: "Head of Customer Success", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop" },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navbar />

            {/* 1. Vision Hero Section */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center text-center">
                {/* Abstract Dynamic Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#050505]">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" /> {/* Optional noise texture if available, else ignored */}
                </div>

                <div className="container mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-primary font-medium uppercase tracking-widest mb-8 backdrop-blur-md">
                        <Lightbulb className="w-4 h-4" />
                        Our Vision
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                        Redefining the <br />
                        <span className="text-white">Art of Living.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                        "We aren't just building homes; we are constructing an ecosystem where design, technology, and manufacturing converge to create seamless living experiences."
                    </p>
                </div>
            </section>

            {/* 2. Philosophy Section */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="col-span-1 md:col-span-1">
                            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                <Hammer className="hidden md:block w-8 h-8 text-primary" />
                                The "Why"
                            </h2>
                            <div className="h-1 w-20 bg-primary mb-6" />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                The construction and interior industry has been fragmented for too long. Homeowners navigate a maze of contractors, designers, and suppliers, often resulting in compromised quality and inflated costs.
                            </p>
                            <p>
                                <strong className="text-foreground">Alevate Spaces</strong> was born from a desire to solve this. By vertically integrating the entire supply chain through our Gigafactory, we bring control back to the creator and value back to the customer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Meet the Founders (Detailed) */}
            <section className="py-32 container mx-auto px-6 relative">
                <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/50 to-transparent -ml-6 hidden xl:block" />

                <h2 className="text-4xl font-bold mb-20 text-center md:text-left flex items-center gap-4">
                    <Users className="w-10 h-10 text-primary" />
                    The Visionaries
                </h2>

                <div className="space-y-32">
                    {founders.map((founder, index) => (
                        <div key={founder.id} className={`flex flex-col lg:flex-row gap-16 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Visual Side */}
                            <div className="w-full lg:w-5/12 relative">
                                <div className="aspect-[4/5] rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden relative group shadow-2xl shadow-black/50 border border-white/10">
                                    <img
                                        src={founder.photo}
                                        alt={founder.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Quote Overlay */}
                                    {founder.vision_quote && (
                                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                                            <Quote className="w-8 h-8 text-primary mb-4" />
                                            <p className="text-lg md:text-xl text-white font-medium italic leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                "{founder.vision_quote}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {/* Decorative elements */}
                                <div className={`absolute -z-10 top-[-20px] ${index % 2 === 0 ? 'left-[-20px]' : 'right-[-20px]'} w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl`} />
                            </div>

                            {/* Info Side */}
                            <div className="w-full lg:w-7/12 pt-4">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-8">
                                    <div>
                                        <h3 className="text-5xl font-bold text-foreground mb-2">{founder.name}</h3>
                                        <p className="text-xl text-primary font-medium tracking-wide uppercase">{founder.role}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        {founder.linkedin_url && (
                                            <a href={founder.linkedin_url} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-foreground hover:text-primary transition-all border border-white/5">
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                        {founder.twitter_url && (
                                            <a href={founder.twitter_url} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-foreground hover:text-primary transition-all border border-white/5">
                                                <Twitter size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8 mb-10">
                                    <div className="md:col-span-2 text-lg text-muted-foreground leading-relaxed">
                                        {founder.bio}
                                    </div>
                                    <div className="md:col-span-1">
                                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 border-l-2 border-primary pl-3">Expertise</h4>
                                        <ul className="space-y-2">
                                            {founder.expertise?.map((skill, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 cursor-pointer transition-colors group">
                                    Read Full Bio <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Team Section (The Builders) */}
            <section className="py-24 bg-gradient-to-b from-[#050505] to-background border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">The Builders</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Behind every great innovation is a team of relentless executors. Meet the leaders driving our operations, design, and technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                        {teamMembers.map((member, i) => (
                            <TeamMember key={i} {...member} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium transition-all duration-300">
                            Simulate Alevate Spaces Team
                        </button>
                        <p className="mt-4 text-xs text-muted-foreground">and 50+ engineers & designers</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}
