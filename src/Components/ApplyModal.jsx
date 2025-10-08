/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const API_URL = "https://api.dss-inc.org/api/job-application";

const defaultRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Project Manager",
    "QA Engineer",
];

const formV = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fieldV = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function ApplyModal({ open, onClose, roles }) {
    const firstFieldRef = useRef(null);

    // status / errors
    const [submitting, setSubmitting] = useState(false);
    const [submitOK, setSubmitOK] = useState(false);
    const [submitErr, setSubmitErr] = useState("");
    const [errors, setErrors] = useState({}); // field errors from API

    // Résumé preview state
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeURL, setResumeURL] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(0); // to reset input

    // Lock body scroll + ESC to close + autofocus
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose?.();
        document.addEventListener("keydown", onKey);
        const id = requestAnimationFrame(() => firstFieldRef.current?.focus());
        return () => {
            document.body.style.overflow = prev;
            document.removeEventListener("keydown", onKey);
            cancelAnimationFrame(id);
        };
    }, [open, onClose]);

    // helpers
    const formatBytes = (bytes) => {
        if (typeof bytes !== "number") return "";
        const units = ["B", "KB", "MB", "GB"];
        let i = 0;
        let n = bytes;
        while (n >= 1024 && i < units.length - 1) {
            n /= 1024;
            i++;
        }
        return `${n.toFixed(1)} ${units[i]}`;
    };

    const handleResumeSelect = (file) => {
        setResumeFile(file || null);
        if (resumeURL) {
            URL.revokeObjectURL(resumeURL);
            setResumeURL(null);
        }
        if (file) {
            const url = URL.createObjectURL(file);
            setResumeURL(url);
        }
    };

    const clearResume = () => {
        if (resumeURL) URL.revokeObjectURL(resumeURL);
        setResumeURL(null);
        setResumeFile(null);
        setFileInputKey((k) => k + 1); // reset native input
    };

    const getErr = (name) => {
        const v = errors?.[name];
        if (!v) return "";
        return Array.isArray(v) ? v[0] : String(v);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitErr("");
        setSubmitOK(false);
        setErrors({});

        try {
            const fd = new FormData(e.currentTarget);

            // Force agree -> "1" or "0"
            const agreed = e.currentTarget.elements.agree?.checked === true;
            fd.set("agree", agreed ? "1" : "0");

            // Ensure selected file is used (if you keep separate preview state)
            if (resumeFile) {
                fd.set("resume", resumeFile);
            }

            // name, email, phone, role, linkedin, website, cover, resume, agree
            const res = await fetch(API_URL, {
                method: "POST",
                body: fd, // browser sets multipart/form-data boundary
            });

            let payload = null;
            try {
                payload = await res.json();
            } catch {
                // ignore non-JSON
            }

            if (!res.ok) {
                if (payload?.errors) setErrors(payload.errors); // <-- store field errors
                const msg =
                    (payload && (payload.message || payload.error)) ||
                    `Request failed (${res.status})`;
                throw new Error(msg);
            }

            // success!
            setSubmitOK(true);
            setSubmitErr("");
            setErrors({});
            e.currentTarget.reset();
            clearResume();
        } catch (err) {
            setSubmitOK(false);
            setSubmitErr(err?.message || "Failed to submit application.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                    {/* Overlay */}
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Sheet */}
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="apply-modal-title"
                        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0, transition: { duration: 0.4, ease } }}
                        exit={{ x: "100%", transition: { duration: 0.3, ease } }}
                    >
                        {/* Header */}
                        <div className="relative overflow-hidden border-b border-gray-100">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent" />
                            <div className="relative flex items-start justify-between gap-4 p-5">
                                <div>
                                    <h2 id="apply-modal-title" className="text-xl font-semibold text-gray-900">
                                        Apply for a Role
                                    </h2>
                                    <p className="text-sm text-gray-500">Tell us a bit about you. We’ll be in touch.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                    <XIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="flex-1 overflow-y-auto p-5 space-y-6"
                            variants={formV}
                            initial="hidden"
                            animate="show"
                        >
                            {/* Status bar */}
                            {(submitOK || submitErr) && (
                                <div
                                    className={[
                                        "rounded-lg border px-3 py-2 text-sm",
                                        submitOK
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                            : "border-rose-200 bg-rose-50 text-rose-800",
                                    ].join(" ")}
                                >
                                    {submitOK ? "Application submitted successfully." : submitErr}
                                </div>
                            )}

                            {/* Section: Your details */}
                            <SectionTitle>1. Your Details</SectionTitle>

                            <motion.div variants={fieldV}>
                                <Input
                                    ref={firstFieldRef}
                                    name="name"
                                    label="Full Name"
                                    placeholder="Jane Doe"
                                    required
                                    icon={UserIcon}
                                    error={getErr("name")}
                                />
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <motion.div variants={fieldV}>
                                    <Input
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="jane@domain.com"
                                        required
                                        icon={MailIcon}
                                        error={getErr("email")}
                                    />
                                </motion.div>
                                <motion.div variants={fieldV}>
                                    <Input
                                        name="phone"
                                        label="Phone"
                                        type="tel"
                                        placeholder="+233 55 000 0000"
                                        icon={PhoneIcon}
                                        error={getErr("phone")}
                                    />
                                </motion.div>
                            </div>

                            <motion.div variants={fieldV}>
                                <Select
                                    name="role"
                                    label="Role"
                                    icon={BriefcaseIcon}
                                    required
                                    options={(roles?.length ? roles : defaultRoles).map((r) => ({ value: r, label: r }))}
                                    error={getErr("role")}
                                />
                            </motion.div>

                            {/* Section: Links (optional) */}
                            <SectionTitle>
                                2. Links <span className="text-gray-400 font-normal">(optional)</span>
                            </SectionTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <motion.div variants={fieldV}>
                                    <Input
                                        name="linkedin"
                                        label="LinkedIn (optional)"
                                        type="url"
                                        placeholder="https://linkedin.com/in/you"
                                        icon={LinkIcon}
                                        error={getErr("linkedin")}
                                    />
                                </motion.div>
                                <motion.div variants={fieldV}>
                                    <Input
                                        name="website"
                                        label="Website / Portfolio (optional)"
                                        type="url"
                                        placeholder="https://your-site.com"
                                        icon={GlobeIcon}
                                        error={getErr("website")}
                                    />
                                </motion.div>
                            </div>

                            {/* Section: Attachments */}
                            <SectionTitle>3. Attachments</SectionTitle>

                            <motion.div variants={fieldV}>
                                <FileDrop
                                    key={fileInputKey}
                                    name="resume"
                                    label="Résumé (PDF, DOCX)"
                                    help="Optional but recommended."
                                    onFileSelect={handleResumeSelect}
                                    disabled={submitting}
                                    error={getErr("resume")}
                                />
                            </motion.div>

                            {/* Uploaded résumé preview */}
                            {resumeFile && (
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{resumeFile.name}</p>
                                            <p className="text-xs text-gray-600">
                                                {formatBytes(resumeFile.size)} · {resumeFile.type || "Unknown type"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {resumeURL && (
                                                <a
                                                    href={resumeURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-white"
                                                >
                                                    Preview
                                                </a>
                                            )}
                                            <button
                                                type="button"
                                                onClick={clearResume}
                                                className="inline-flex items-center justify-center rounded-full bg-rose-50 text-rose-700 px-3 py-1.5 text-xs font-semibold hover:bg-rose-100"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <motion.div variants={fieldV}>
                                <Textarea
                                    name="cover"
                                    label="Cover Letter"
                                    placeholder="Why are you a great fit?"
                                    rows={5}
                                    error={getErr("cover")}
                                />
                            </motion.div>

                            {/* Consent + Actions */}
                            <motion.div className="flex items-center gap-3" variants={fieldV}>
                                <input
                                    id="agree"
                                    name="agree"
                                    type="checkbox"
                                    required
                                    className={`h-4 w-4 rounded border-gray-300 ${getErr("agree") ? "border-rose-400 ring-rose-400" : ""}`}
                                    aria-invalid={Boolean(getErr("agree")) || undefined}
                                />
                                <label htmlFor="agree" className="text-sm text-gray-600">
                                    I agree to the processing of my personal data.
                                </label>
                            </motion.div>
                            {getErr("agree") ? (
                                <p className="mt-[-0.25rem] text-xs text-rose-600" role="alert">
                                    {getErr("agree")}
                                </p>
                            ) : null}

                            <motion.div className="flex items-center gap-3 pt-2" variants={fieldV}>
                                <motion.button
                                    type="submit"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={submitting}
                                    className={[
                                        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-white font-semibold shadow",
                                        submitting ? "bg-amber-400 cursor-not-allowed" : "bg-amber-500",
                                    ].join(" ")}
                                >
                                    {submitting ? "Submitting..." : "Submit Application"}
                                    {!submitting && <ArrowRight className="h-4 w-4" />}
                                </motion.button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </motion.div>
                        </motion.form>
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

ApplyModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
};

ApplyModal.defaultProps = {
    roles: undefined,
};

/* ---------- UI bits ---------- */
const SectionTitle = ({ children }) => (
    <div className="text-sm font-semibold tracking-wide text-gray-900">
        {children}
        <div className="mt-2 h-px w-full bg-gradient-to-r from-amber-500/40 via-amber-400/20 to-transparent" />
    </div>
);
SectionTitle.propTypes = { children: PropTypes.node.isRequired };

const baseInput =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-inner shadow-black/0 hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition";

const errorInput =
    "border-rose-300 bg-rose-50 focus:ring-rose-400/40 focus:border-rose-400";

const Label = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-800">
        {children} {required && <span className="text-amber-600">*</span>}
    </label>
);
Label.propTypes = { htmlFor: PropTypes.string, children: PropTypes.node, required: PropTypes.bool };

const WithIcon = ({ icon: Icon }) => (
    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
        <Icon className="h-4.5 w-4.5 text-gray-400" />
    </span>
);
WithIcon.propTypes = { icon: PropTypes.elementType.isRequired };

const Input = React.forwardRef(function Input(
    { name, label, type = "text", placeholder, required = false, icon, error },
    ref
) {
    return (
        <div>
            <Label htmlFor={name} required={required}>{label}</Label>
            <div className="relative">
                {icon ? <WithIcon icon={icon} /> : null}
                <input
                    ref={ref}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    aria-invalid={Boolean(error) || undefined}
                    className={`${baseInput} ${icon ? "pl-10" : ""} ${error ? errorInput : ""}`}
                />
            </div>
            {error ? (
                <p className="mt-1 text-xs text-rose-600" role="alert">{error}</p>
            ) : null}
        </div>
    );
});
Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    icon: PropTypes.elementType,
    error: PropTypes.string,
};

function Textarea({ name, label, placeholder, rows = 4, error }) {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                placeholder={placeholder}
                aria-invalid={Boolean(error) || undefined}
                className={`${baseInput} resize-y ${error ? errorInput : ""}`}
            />
            {error ? <p className="mt-1 text-xs text-rose-600" role="alert">{error}</p> : null}
        </div>
    );
}
Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    error: PropTypes.string,
};

function Select({ name, label, options, required = false, icon, error }) {
    return (
        <div>
            <Label htmlFor={name} required={required}>{label}</Label>
            <div className="relative">
                {icon ? <WithIcon icon={icon} /> : null}
                <select
                    id={name}
                    name={name}
                    required={required}
                    aria-invalid={Boolean(error) || undefined}
                    className={`${baseInput} ${icon ? "pl-10" : ""} appearance-none pr-9 ${error ? errorInput : ""}`}
                >
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-gray-400">
                    <ChevronDown className="h-4 w-4" />
                </span>
            </div>
            {error ? <p className="mt-1 text-xs text-rose-600" role="alert">{error}</p> : null}
        </div>
    );
}
Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })).isRequired,
    required: PropTypes.bool,
    icon: PropTypes.elementType,
    error: PropTypes.string,
};

function FileDrop({ name, label, help, disabled = false, onFileSelect, error }) {
    const handleChange = (e) => {
        const file = e.target.files?.[0] || null;
        onFileSelect?.(file);
    };

    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <label
                htmlFor={name}
                className={`group flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center hover:border-amber-400 hover:bg-white transition ${error ? "border-rose-300 bg-rose-50" : ""
                    } ${disabled ? "opacity-70 cursor-not-allowed pointer-events-none" : ""}`}
            >
                <UploadIcon className="h-6 w-6 text-gray-500 group-hover:text-amber-500" />
                <div className="text-sm">
                    <span className="font-semibold text-gray-800">Click to upload</span>{" "}
                    <span className="text-gray-500">or drag & drop</span>
                </div>
                <div className="text-xs text-gray-500">PDF, DOC, DOCX up to ~10MB</div>
                <input
                    id={name}
                    name={name}
                    type="file"
                    accept=".pdf,.doc,.docx,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="sr-only"
                    onChange={handleChange}
                    disabled={disabled}
                />
            </label>
            {help ? <p className="mt-1 text-xs text-gray-500">{help}</p> : null}
            {error ? <p className="mt-1 text-xs text-rose-600" role="alert">{error}</p> : null}
        </div>
    );
}
FileDrop.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
    disabled: PropTypes.bool,
    onFileSelect: PropTypes.func,
    error: PropTypes.string,
};

/* ---------- Icons ---------- */
function XIcon({ className }) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
        </svg>
    );
}
function ArrowRight({ className }) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 10h10" strokeLinecap="round" />
            <path d="M10 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function UserIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20a8 8 0 0116 0" />
        </svg>
    );
}
function MailIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 6h16v12H4z" />
            <path d="M4 8l8 6 8-6" />
        </svg>
    );
}
function PhoneIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M22 16.9v2a2 2 0 01-2.2 2 19 19 0 01-8.3-3.1 18.5 18.5 0 01-5.7-5.7A19 19 0 012.9 4.2 2 2 0 014.9 2h2a2 2 0 012 1.7c.1.9.3 1.7.6 2.5a2 2 0 01-.5 2.1L7.9 9.6a16 16 0 005.7 5.7l1.3-1.1a2 2 0 012.1-.5c.8.3 1.6.5 2.5.6a2 2 0 011.7 2.1z" />
        </svg>
    );
}
function BriefcaseIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="7" width="18" height="11" rx="2" />
            <path d="M9 7V6a2 2 0 012-2h2a2 2 0 012 2v1" />
        </svg>
    );
}
function LinkIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 13a5 5 0 007.07 0l1.06-1.06a5 5 0 00-7.07-7.07L10 6" />
            <path d="M14 11a5 5 0 00-7.07 0L5.86 12.07a5 5 0 007.07 7.07L14 18" />
        </svg>
    );
}
function GlobeIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
        </svg>
    );
}
function ChevronDown({ className }) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function UploadIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 16V4" strokeLinecap="round" />
            <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" strokeLinecap="round" />
        </svg>
    );
}

XIcon.propTypes = { className: PropTypes.string };
ArrowRight.propTypes = { className: PropTypes.string };
UserIcon.propTypes = { className: PropTypes.string };
MailIcon.propTypes = { className: PropTypes.string };
PhoneIcon.propTypes = { className: PropTypes.string };
BriefcaseIcon.propTypes = { className: PropTypes.string };
LinkIcon.propTypes = { className: PropTypes.string };
GlobeIcon.propTypes = { className: PropTypes.string };
ChevronDown.propTypes = { className: PropTypes.string };
UploadIcon.propTypes = { className: PropTypes.string };
