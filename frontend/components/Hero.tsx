"use client";

import { motion } from "framer-motion";
import { GigaFactoryBackground } from "@/components/GigaFactoryBackground";

export function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Interactive Giga-Scale Background */}
            <GigaFactoryBackground />

            <div className="relative z-10 container px-4 md:px-6 text-center pointer-events-none flex flex-col items-center justify-center h-full pt-20">
                {/* Pointer events none on container to let background be interactive, but enable pointer events on text/buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-10 pointer-events-auto"
                >
                    <div className="inline-block px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs md:text-sm font-medium tracking-[0.2em] uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                        Giga-Scale Manufacturing Ecosystem
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter pointer-events-auto leading-[0.9]"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        House of
                    </span>
                    <br />
                    <span className="text-primary relative inline-block mx-2">
                        D2C Brands
                        {/* Small dot accent */}
                        <span className="absolute -top-1 -right-3 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse" />
                    </span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-2xl md:text-4xl lg:text-5xl text-foreground font-semibold mt-6 md:mt-8 tracking-tight pointer-events-auto"
                >
                    for Construction and Interior Industry
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 text-lg md:text-2xl text-muted-foreground max-w-5xl mx-auto font-light leading-relaxed pointer-events-auto"
                >
                    We are building an entire ecosystem of D2C brands to cater right from <span className="text-foreground font-medium">building or buying a new home</span> to <span className="text-foreground font-medium">interior design</span>, <span className="text-foreground font-medium">interior fit-out</span>, <span className="text-foreground font-medium">after-sales support</span>, and everything in between through our <span className="text-primary font-medium">Gigafactory</span>, Gigascale manufacturing.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-14 pointer-events-auto"
                >
                    <a
                        href="#brands"
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-primary-foreground transition-all duration-300 bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] hover:scale-105"
                    >
                        Explore Our Brands
                        <svg className="w-5 h-5 ml-2 transition-transform duration-200 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
