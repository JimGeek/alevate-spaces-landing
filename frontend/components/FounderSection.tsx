"use client";

import { motion } from "framer-motion";
import { Founder } from "@/types";
import { cn } from "@/lib/utils";

export function FounderSection({ founders }: { founders: Founder[] }) {
    if (!founders || founders.length === 0) return null;

    return (
        <section id="founders" className="py-24 relative bg-background overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none" />

            <div className="container px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        Visionaries
                    </h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                        The minds behind the brands.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={founder.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="flex flex-col md:flex-row gap-8 items-center md:items-start"
                        >
                            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[40px]" />
                                <img
                                    src={founder.photo || "/placeholder-founder.jpg"}
                                    alt={founder.name}
                                    className="relative w-full h-full object-cover rounded-full border-2 border-primary/50 grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-foreground">{founder.name}</h3>
                                <p className="text-primary font-medium mb-4">{founder.role}</p>
                                <div className="h-1 w-12 bg-border mx-auto md:mx-0 mb-4" />
                                <p className="text-muted-foreground leading-relaxed">
                                    {founder.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
