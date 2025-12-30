"use client";

import { motion } from "framer-motion";
import { Brand } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const statusColors = {
    ideation: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    manufacturing: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    revenue: "bg-green-500/10 text-green-500 border-green-500/20",
};

const statusLabels = {
    ideation: "In Ideation",
    manufacturing: "Manufacturing Setup",
    revenue: "Revenue Generating",
};

export function BrandCard({ brand, index }: { brand: Brand; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-[400px] w-full overflow-hidden rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm"
        >
            {/* Background Image (Hero) */}
            <div className="absolute inset-0 z-0">
                <img
                    src={brand.hero_image || "/placeholder-brand.jpg"}
                    alt={brand.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            {brand.logo ? (
                                <img src={brand.logo} alt={`${brand.name} logo`} className="h-12 w-auto object-contain invert brightness-0 filter" />
                            ) : null}
                            <h3 className="text-3xl font-bold text-foreground tracking-tight">{brand.name}</h3>
                        </div>
                        {brand.website_url && (
                            <Link
                                href={brand.website_url}
                                target="_blank"
                                className="p-2 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors"
                            >
                                <ArrowUpRight size={20} />
                            </Link>
                        )}
                    </div>

                    <div className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-4",
                        statusColors[brand.status]
                    )}>
                        {statusLabels[brand.status]}
                    </div>

                    <p className="text-muted-foreground line-clamp-2 group-hover:line-clamp-none transition-all duration-300 mb-0 group-hover:mb-4 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto">
                        {brand.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
