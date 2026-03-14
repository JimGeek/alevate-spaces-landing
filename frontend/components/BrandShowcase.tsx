"use client";

import { useState } from "react";
import { Brand } from "@/types";
import { BrandCard } from "./BrandCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function BrandShowcase({ brands }: { brands: Brand[] }) {
    const [activeFilter, setActiveFilter] = useState("all");

    // Build dynamic filters from the stages present in the brand list
    const stageFilters = Array.from(
        new Map(
            brands
                .filter((b) => b.stage)
                .map((b) => [b.stage!.id, b.stage!])
        ).values()
    ).sort((a, b) => a.order - b.order);

    const filteredBrands = brands.filter((brand) => {
        if (activeFilter === "all") return true;
        return String(brand.stage?.id) === activeFilter;
    });

    return (
        <section id="brands" className="py-24 container mx-auto px-6">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold mb-4">Our Brands</h2>
                    <div className="h-1 w-24 bg-primary rounded-full" />
                </div>

                {/* Filter Tabs */}
                {stageFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveFilter("all")}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                activeFilter === "all"
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                            )}
                        >
                            All Brands
                        </button>
                        {stageFilters.map((stage) => (
                            <button
                                key={stage.id}
                                onClick={() => setActiveFilter(String(stage.id))}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                    activeFilter === String(stage.id)
                                        ? "text-white border-transparent"
                                        : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                                )}
                                style={activeFilter === String(stage.id) ? { backgroundColor: stage.color, borderColor: stage.color } : {}}
                            >
                                {stage.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {filteredBrands.map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <BrandCard brand={brand} index={index} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredBrands.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center text-zinc-500 py-20">
                        <p className="text-lg">No brands found in this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
