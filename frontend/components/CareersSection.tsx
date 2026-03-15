"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, MapPin, X, ArrowRight, Loader2, CheckCircle,
    Clock, Monitor, Users, IndianRupee, Upload, Linkedin,
    ChevronRight, Calendar,
} from "lucide-react";

interface JobPosting {
    id: number;
    title: string;
    department: string;
    location: string;
    work_type?: string;
    employment_type?: string;
    timing?: string;
    salary_min?: number | null;
    salary_max?: number | null;
    description: string;
    requirements: string;
    closing_date?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.superhomes.app";

const WORK_TYPE_LABELS: Record<string, string> = {
    on_site: "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
};

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    internship: "Internship",
};

function formatSalary(min?: number | null, max?: number | null) {
    if (!min && !max) return null;
    const fmt = (n: number) =>
        n >= 100000
            ? `₹${(n / 100000).toFixed(1)}L`
            : `₹${(n / 1000).toFixed(0)}K`;
    if (min && max) return `${fmt(min)} – ${fmt(max)}/mo`;
    if (min) return `From ${fmt(min)}/mo`;
    return `Up to ${fmt(max!)}/mo`;
}

export function CareersSection() {
    const [jobs, setJobs] = useState<JobPosting[]>([]);
    const [loading, setLoading] = useState(true);
    const [detailJob, setDetailJob] = useState<JobPosting | null>(null);
    const [applyJob, setApplyJob] = useState<JobPosting | null>(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "", experience_years: "", linkedin_url: "", cover_letter: "" });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const openDetail = (job: JobPosting) => {
        setDetailJob(job);
        setApplyJob(null);
    };

    const openApply = (job: JobPosting) => {
        setApplyJob(job);
        setDetailJob(null);
        setForm({ name: "", email: "", phone: "", experience_years: "", linkedin_url: "", cover_letter: "" });
        setResumeFile(null);
        setSubmitted(false);
        setError("");
    };

    const closeAll = () => {
        setDetailJob(null);
        setApplyJob(null);
        setSubmitted(false);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!applyJob) return;
        setSubmitting(true);
        setError("");
        try {
            const fd = new FormData();
            fd.append("job", String(applyJob.id));
            fd.append("name", form.name.trim());
            fd.append("email", form.email.trim());
            fd.append("phone", form.phone.trim());
            if (form.experience_years) fd.append("experience_years", form.experience_years);
            if (form.linkedin_url.trim()) fd.append("linkedin_url", form.linkedin_url.trim());
            if (form.cover_letter.trim()) fd.append("cover_letter", form.cover_letter.trim());
            if (resumeFile) fd.append("resume", resumeFile);

            const res = await fetch(`${API_URL}/api/v1/hrms/public/apply/`, {
                method: "POST",
                body: fd,
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

    const activeModal = detailJob || applyJob;

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
                        {jobs.map((job, i) => {
                            const salary = formatSalary(job.salary_min, job.salary_max);
                            return (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    className="group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-300"
                                >
                                    {/* Top */}
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div>
                                            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{job.department}</p>
                                            <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <Briefcase className="w-4 h-4 text-primary" />
                                        </div>
                                    </div>

                                    {/* Meta badges */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.location && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                <MapPin className="w-3 h-3" /> {job.location}
                                            </span>
                                        )}
                                        {job.work_type && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                <Monitor className="w-3 h-3" /> {WORK_TYPE_LABELS[job.work_type] || job.work_type}
                                            </span>
                                        )}
                                        {job.employment_type && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                <Users className="w-3 h-3" /> {EMPLOYMENT_TYPE_LABELS[job.employment_type] || job.employment_type}
                                            </span>
                                        )}
                                        {job.timing && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                <Clock className="w-3 h-3" /> {job.timing}
                                            </span>
                                        )}
                                    </div>

                                    {/* Salary */}
                                    {salary && (
                                        <div className="flex items-center gap-1 text-sm font-semibold text-green-400 mb-3">
                                            <IndianRupee className="w-3.5 h-3.5" /> {salary}
                                        </div>
                                    )}

                                    {/* Description preview */}
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                                        {job.description}
                                    </p>

                                    {/* Closing date */}
                                    {job.closing_date && (
                                        <p className="text-xs text-muted-foreground/50 mb-4 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Apply by {new Date(job.closing_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openDetail(job)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium border border-white/10 transition-all duration-200"
                                        >
                                            View Details <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => openApply(job)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all duration-200"
                                        >
                                            Apply Now <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                <p className="text-center text-sm text-muted-foreground/50">
                    Don't see the right role?{" "}
                    <a href="mailto:career@alevate.space" className="text-white hover:text-primary transition-colors border-b border-white/20">
                        Drop us your CV
                    </a>
                </p>
            </div>

            {/* Modal Backdrop */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
                        onClick={closeAll}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.2 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* ── JOB DETAIL VIEW ── */}
                            {detailJob && (
                                <>
                                    <div className="flex items-start justify-between p-6 border-b border-white/10 shrink-0">
                                        <div>
                                            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{detailJob.department}</p>
                                            <h3 className="text-2xl font-bold text-white mb-2">{detailJob.title}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {detailJob.location && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                        <MapPin className="w-3 h-3" /> {detailJob.location}
                                                    </span>
                                                )}
                                                {detailJob.work_type && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                        <Monitor className="w-3 h-3" /> {WORK_TYPE_LABELS[detailJob.work_type] || detailJob.work_type}
                                                    </span>
                                                )}
                                                {detailJob.employment_type && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                        <Users className="w-3 h-3" /> {EMPLOYMENT_TYPE_LABELS[detailJob.employment_type] || detailJob.employment_type}
                                                    </span>
                                                )}
                                                {detailJob.timing && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                        <Clock className="w-3 h-3" /> {detailJob.timing}
                                                    </span>
                                                )}
                                                {formatSalary(detailJob.salary_min, detailJob.salary_max) && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                                                        <IndianRupee className="w-3 h-3" /> {formatSalary(detailJob.salary_min, detailJob.salary_max)}
                                                    </span>
                                                )}
                                                {detailJob.closing_date && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                                        <Calendar className="w-3 h-3" />
                                                        Closes {new Date(detailJob.closing_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={closeAll} className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors ml-4 shrink-0">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                        <div>
                                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-primary pl-3">About the Role</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{detailJob.description}</p>
                                        </div>
                                        {detailJob.requirements && (
                                            <div>
                                                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-primary pl-3">Requirements</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{detailJob.requirements}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 border-t border-white/10 shrink-0">
                                        <button
                                            onClick={() => openApply(detailJob)}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-colors"
                                        >
                                            Apply for this Role <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* ── APPLICATION FORM ── */}
                            {applyJob && (
                                <>
                                    <div className="flex items-start justify-between p-6 border-b border-white/10 shrink-0">
                                        <div>
                                            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{applyJob.department}</p>
                                            <h3 className="text-xl font-bold text-white">{applyJob.title}</h3>
                                            {applyJob.location && (
                                                <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                                    <MapPin className="w-3.5 h-3.5" /> {applyJob.location}
                                                    {applyJob.work_type && <> · {WORK_TYPE_LABELS[applyJob.work_type]}</>}
                                                </p>
                                            )}
                                        </div>
                                        <button onClick={closeAll} className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors ml-4 shrink-0">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6">
                                        {submitted ? (
                                            <div className="text-center py-8">
                                                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                                <h4 className="text-xl font-bold text-white mb-2">Application Submitted!</h4>
                                                <p className="text-muted-foreground mb-6">
                                                    Thanks for applying for <strong className="text-white">{applyJob.title}</strong>. We'll review your application and get back to you soon.
                                                </p>
                                                <button onClick={closeAll} className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">
                                                    Done
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                {/* Name + Email */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-white/80 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                                                        <input type="text" required value={form.name}
                                                            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                                            placeholder="Jimit Shah"
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-white/80 mb-1.5">Email <span className="text-red-400">*</span></label>
                                                        <input type="email" required value={form.email}
                                                            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                                                            placeholder="you@example.com"
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition" />
                                                    </div>
                                                </div>

                                                {/* Phone + Experience */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-white/80 mb-1.5">Phone</label>
                                                        <input type="tel" value={form.phone}
                                                            onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                                                            placeholder="+91 98765 43210"
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-white/80 mb-1.5">Years of Experience</label>
                                                        <input type="number" min="0" max="50" value={form.experience_years}
                                                            onChange={(e) => setForm(f => ({ ...f, experience_years: e.target.value }))}
                                                            placeholder="e.g. 3"
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition" />
                                                    </div>
                                                </div>

                                                {/* LinkedIn */}
                                                <div>
                                                    <label className="block text-sm font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                                                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile
                                                    </label>
                                                    <input type="url" value={form.linkedin_url}
                                                        onChange={(e) => setForm(f => ({ ...f, linkedin_url: e.target.value }))}
                                                        placeholder="https://linkedin.com/in/yourname"
                                                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition" />
                                                </div>

                                                {/* Resume Upload */}
                                                <div>
                                                    <label className="block text-sm font-medium text-white/80 mb-1.5">Resume / CV</label>
                                                    <div
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 border-dashed text-sm text-muted-foreground cursor-pointer hover:bg-white/[0.07] hover:border-primary/50 transition"
                                                    >
                                                        <Upload className="w-4 h-4 shrink-0 text-primary" />
                                                        {resumeFile ? (
                                                            <span className="text-white truncate">{resumeFile.name}</span>
                                                        ) : (
                                                            <span>Click to upload PDF, DOC, or DOCX (max 5MB)</span>
                                                        )}
                                                    </div>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        className="hidden"
                                                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                                    />
                                                </div>

                                                {/* Cover Letter */}
                                                <div>
                                                    <label className="block text-sm font-medium text-white/80 mb-1.5">Cover Letter / Why this role?</label>
                                                    <textarea rows={4} value={form.cover_letter}
                                                        onChange={(e) => setForm(f => ({ ...f, cover_letter: e.target.value }))}
                                                        placeholder="Tell us what excites you about this role and what you bring to the table…"
                                                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-primary focus:bg-white/[0.07] transition resize-none" />
                                                </div>

                                                {error && (
                                                    <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">{error}</p>
                                                )}

                                                <button type="submit" disabled={submitting}
                                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
                                                >
                                                    {submitting ? (
                                                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                                                    ) : (
                                                        <>Submit Application <ArrowRight className="w-4 h-4" /></>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
