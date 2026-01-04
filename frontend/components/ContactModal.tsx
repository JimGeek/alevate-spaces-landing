"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const contactOptions = [
        {
            icon: Phone,
            label: "Call Us",
            value: "+91 86900 62814",
            href: "tel:+918690062814",
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            icon: MessageCircle,
            label: "WhatsApp",
            value: "Chat on WhatsApp",
            href: "https://wa.me/918690062814",
            color: "text-green-500",
            bgColor: "bg-green-500/10",
        },
        {
            icon: Mail,
            label: "Email Us",
            value: "contact@alevate.space",
            href: "mailto:contact@alevate.space",
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
        },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-[70] w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-6"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-[#050505] border border-white/10 shadow-2xl p-6 md:p-8">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
                                    Get in Touch
                                </h2>
                                <p className="text-muted-foreground">
                                    We'd love to hear from you. Choose a way to reach out.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {contactOptions.map((option, i) => (
                                    <a
                                        key={i}
                                        href={option.href}
                                        target={option.href.startsWith("http") ? "_blank" : undefined}
                                        rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                                    >
                                        <div className={`p-3 rounded-full ${option.bgColor} ${option.color} group-hover:scale-110 transition-transform`}>
                                            <option.icon size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                                                {option.label}
                                            </h3>
                                            <p className="text-sm text-zinc-400 font-light">
                                                {option.value}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
