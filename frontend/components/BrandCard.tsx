"use client";

import { motion } from "framer-motion";
import { Brand } from "@/types";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn, getImageUrl } from "@/lib/utils";

const statusColors = {
    ideation: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    manufacturing: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    revenue: "bg-green-500/20 text-green-300 border-green-500/30",
};

const statusLabels = {
    ideation: "In Ideation",
    manufacturing: "Manufacturing Setup",
    revenue: "Revenue Generating",
};

export function BrandCard({ brand, index }: { brand: Brand; index: number }) {
    // Format launch date
    const launchDate = brand.launch_date
        ? new Date(brand.launch_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : "Coming Soon";

    const CardContent = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl hover:shadow-primary/5 transition-shadow duration-300 cursor-pointer"
        >
            {/* Top Section: Hero Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-800">
                <Image
                    src={getImageUrl(brand.hero_image) || "/placeholder-brand.jpg"}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Bottom Section: Content */}
            <div className="flex flex-1 flex-col px-6 pb-6 pt-0 relative">

                {/* Overlapping Logo */}
                <div className="-mt-12 mb-3 inline-block">
                    {brand.logo ? (
                        <div className="h-24 w-24 rounded-2xl bg-zinc-900 border-4 border-zinc-900 shadow-xl flex items-center justify-center overflow-hidden">
                            <div className="h-full w-full bg-white p-2 flex items-center justify-center relative">
                                <Image
                                    src={getImageUrl(brand.logo)}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="h-24 w-24 rounded-2xl bg-zinc-800 border-4 border-zinc-900"></div>
                    )}
                </div>

                {/* Header */}
                <div className="mb-3">
                    <div className="flex justify-between items-start gap-4 mb-1.5">
                        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{brand.name}</h3>

                        {/* Status Badge */}
                        <div className={cn(
                            "shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                            statusColors[brand.status]
                        )}>
                            {statusLabels[brand.status]}
                        </div>
                    </div>
                    <p className="text-sm font-medium text-primary/90 line-clamp-2 leading-snug">{brand.one_liner}</p>
                </div>

                {/* Description */}
                <div className="flex-1 mb-4">
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-5">
                        {brand.description}
                    </p>
                </div>

                {/* Footer / Meta */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">

                    {/* Established Date */}
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Clock size={14} />
                        <span className="text-xs font-medium">Est. {launchDate}</span>
                    </div>

                    {/* Visit Button (Visual) */}
                    <div className="flex items-center gap-1 text-xs font-semibold text-white group-hover:text-primary transition-colors">
                        Visit Website <ArrowUpRight size={14} />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (brand.website_url) {
        return (
            <Link href={brand.website_url} target="_blank" className="block w-full h-full">
                {CardContent}
            </Link>
        );
    }

    return <div className="block w-full h-full">{CardContent}</div>;
}
