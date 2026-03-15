"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, X, ArrowRight, Loader2, CheckCircle } from "lucide-react";

interface JobPosting {
    id: number;
    title: string;
    department: string;
    location: string;
    description: string;
    requirements: string;
    closing_date?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.superhomes.app";

export function CareersSection() {
    const [jobs, setJobs] = useState<JobPosting[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "", cover_letter: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/v1/hrms/public/jobs/`)
            .then((r) => r.json())
            .then((data) => {
                // GeniusOS wraps responses: { success: true, data: [...] }
                const list = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (data.results || []));
                setJobs(list);
            })
            .catch(() => setJobs([]))
            .finally(() => setLoading(false));
    }, []);

    const openModal = (job: JobPosting) => {
        setSelectedJob(job);
        setForm({ name: "", email: "", phone: "", cover_letter: "" });
        setSubmitted(false);
        setError("");
    };

    const closeModal = () => {
        setSelectedJob(null);
        setSubmitted(false);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJob) return;
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch(`${API_URL}/api/v1/hrms/public/apply/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ job: selectedJob.id, ...form }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setSubmitted(true);
            } else {
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Could not connect. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-32 bg-gradient-to-b from-[#050505] to-background border-t border-white/5">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-medium uppercase tracking-widest mb-6">
                        <Briefcase className="w-3.5 h-3.5" />
                        Careers
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Come Join The Revolution
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We're building the future of living. Join a team that moves fast, thinks big, and builds things that matter.
                    </p>
                </div>

                {/* Job Listings */}
                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg mb-2">No open positions right now.</p>
                        <p className="text-sm text-muted-foreground/60">
                            Send your CV to{" "}
                            <a href="mailto:career@alevate.space" className="text-primary hover:underline">
                                career@alevate.space
                            </a>{" "}
                            and we'll keep you in mind.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                        {jobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div>
                                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{job.department}</p>
                                        <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <Briefcase className="w-4 h-4 text-primary" />
                                    </div>
                                </div>

                                {job.location && (
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {job.location}
                                    </div>
                                )}

                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-5">
                                    {job.description}
                                </p>

                                {job.closing_date && (
                                    <p className="text-xs text-muted-foreground/50 mb-4">
                                        Apply by {new Date(job.closing_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                )}

                                <button
                                    onClick={() => openModal(job)}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-primary text-white text-sm font-semibold border border-white/10 hover:border-primary transition-all duration-300 group/btn"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}

                <p className="text-center text-sm text-muted-foreground/50">
                    Don't see the right role?{" "}
                    <a href="mailto:career@alevate.space" className="text-white hover:text-primary transition-colors border-b border-white/20">
                        Drop us your CV
                    </a>
                </p>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.2 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-start justify-between p-6 border-b border-white/10">
                                <div>
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{selectedJob.department}</p>
                                    <h3 className="text-xl font-bold text-white">{selectedJob.title}</h3>
                                    {selectedJob.location && (
                                        <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                            <MapPin className="w-3.5 h-3.5" /> {selectedJob.location}
                                        </p>
                                    )}
                                </div>
                                <button onClick={closeModal} className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                {submitted ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                        <h4 className="text-xl font-bold text-white mb-2">Application Submitted!</h4>
                                        <p className="text-muted-foreground mb-6">
                                            Thanks for applying for <strong className="text-white">{selectedJob.title}</strong>. We'll review your application and get back to you soon.
                                        </p>
                                        <button
                                            onClick={closeModal}
                                            className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
                                        >
                                            Done
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                                placeholder="Jimit Shah"
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-1.5">Email <span className="text-red-400">*</span></label>
                                            <input
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                                placeholder="you@example.com"
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-1.5">Phone</label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-1.5">Cover Letter / Why this role?</label>
                                            <textarea
                                                rows={4}
                                                value={form.cover_letter}
                                                onChange={(e) => setForm((f) => ({ ...f, cover_letter: e.target.value }))}
                                                placeholder="Tell us what excites you about this role and what you bring to the table..."
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition resize-none"
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">{error}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
                                        >
                                            {submitting ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                            ) : (
                                                <>Submit Application <ArrowRight className="w-4 h-4" /></>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
