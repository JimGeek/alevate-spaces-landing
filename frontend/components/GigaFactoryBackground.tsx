"use client";

import {
    Palette,
    Ruler,
    Key,
    Hammer,
    Zap,
    Armchair,
    Store,
    Factory,
    Bath,
    Wrench,
    DoorOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GigaFactoryBackground() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    if (dimensions.width === 0) return null;

    // Parallax calculation
    const moveX = (mousePos.x - dimensions.width / 2) * 0.02;
    const moveY = (mousePos.y - dimensions.height / 2) * 0.02;

    // Nodes positioning - Distributed around the periphery to avoid center text
    const nodes = [
        { id: "construction", label: "Home Construction", icon: Hammer, top: "20%", left: "15%", color: "#ef4444", delay: 0 },
        { id: "purchase", label: "Home Purchase", icon: Key, top: "20%", left: "85%", color: "#3b82f6", delay: 0.1 },
        { id: "design", label: "Interior Design", icon: Palette, top: "50%", left: "10%", color: "#d946ef", delay: 0.2 },
        { id: "fitout", label: "Interior Fit-out", icon: Ruler, top: "50%", left: "90%", color: "#f59e0b", delay: 0.3 },
        { id: "automation", label: "Home Automation", icon: Zap, top: "80%", left: "20%", color: "#eab308", delay: 0.4 },
        { id: "furnishing", label: "Home Furnishing", icon: Armchair, top: "80%", left: "80%", color: "#8b5cf6", delay: 0.5 },
        // Moved Super Store to top center to avoid collision with "Explore Our Brands" button
        { id: "superstore", label: "Interior Super Store", icon: Store, top: "12%", left: "32%", color: "#10b981", delay: 0.6 },

        // New Nodes
        { id: "shed", label: "Industrial Shed", icon: Factory, top: "35%", left: "25%", color: "#64748b", delay: 0.7 },
        { id: "bathroom", label: "Bathroom Renovation", icon: Bath, top: "68%", left: "18%", color: "#06b6d4", delay: 0.8 },
        { id: "metal", label: "Metal Works", icon: Wrench, top: "35%", left: "75%", color: "#78716c", delay: 0.9 },
        { id: "windows", label: "Windows & Doors", icon: DoorOpen, top: "68%", left: "82%", color: "#f97316", delay: 1.0 },
    ];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0f172a] pointer-events-none">
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-[-5%]" // Make slightly larger to allow movement
                animate={{
                    x: -moveX,
                    y: -moveY
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
            >
                <img
                    src="/images/gigafactory-isometric.png"
                    alt="GigaFactory Ecosystem"
                    className="w-full h-full object-cover opacity-80" // Increased opacity
                />
                {/* Lighter overlay for text readability but easier to see image */}
                <div className="absolute inset-0 bg-background/40" />

                {/* Gradient fades at edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
            </motion.div>

            {/* Floating Interactive Hotspots */}
            {/* Floating Interactive Hotspots */}
            {nodes.map((node, i) => (
                <motion.div
                    key={node.id}
                    className="absolute z-10 pointer-events-auto cursor-pointer group hidden md:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: [0, 30, -20, 0],
                        y: [0, -40, 20, 0]
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.5 + node.delay },
                        scale: { duration: 0.8, delay: 0.5 + node.delay },
                        x: {
                            duration: 15 + (i * 2),
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        },
                        y: {
                            duration: 12 + (i * 3),
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }
                    }}
                    style={{
                        top: node.top,
                        left: node.left,
                        transform: 'translate(-50%, -50%)' // Center the node point
                    }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Node Point */}
                        <div className="relative">
                            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 relative" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 animate-ping" />
                        </div>

                        {/* Glass Card Label */}
                        <div
                            className="absolute top-6 left-1/2 -translate-x-1/2 mt-2 px-2 py-1.5 md:px-4 md:py-2 rounded-xl bg-black/30 md:bg-black/50 backdrop-blur-md border border-white/5 md:border-white/10 shadow-xl flex items-center gap-2 md:gap-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70 group-hover:border-white/40 whitespace-nowrap"
                        >
                            <node.icon className="w-3 h-3 md:w-5 md:h-5 text-white/90" />
                            <div className="hidden md:block">
                                <span className="block text-xs md:text-sm font-semibold text-white tracking-wide">{node.label}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

