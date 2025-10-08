/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import leftImg from "../../assets/contact/leftImg.png";
import rightImg from "../../assets/contact/rightImg.png";
import { Mail } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const sectionV = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.08 },
    },
};

const headerV = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const cardV = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
};

/** Decide the endpoint:
 * - If you use the Vite proxy (see below), call "/dss/api/contactus" in dev.
 * - In production, call the real domain.
 * - You can override via VITE_CONTACT_API in your .env if you like.
 */
const API_URL = "https://api.dss-inc.org/api/contactus";

export default function ContactBody({ leftImage, rightImage }) {
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState(null); // {type: 'ok'|'err', text: string}

    const onSubmit = async (e) => {
        e.preventDefault();
        setNotice(null);

        const formData = new FormData(e.target);

        // normalize to primitive types/strings the API may expect
        formData.set("agree", formData.get("agree") ? "true" : "false");

        setLoading(true);
        try {
            // IMPORTANT: do NOT set headers; let the browser set multipart boundary to avoid preflight
            const res = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            // The API may return JSON or plain text; handle both safely
            const contentType = res.headers.get("content-type") || "";
            const payload = contentType.includes("application/json")
                ? await res.json().catch(() => ({}))
                : await res.text().catch(() => "");

            if (!res.ok) {
                const message =
                    (payload && payload.message) ||
                    (typeof payload === "string" && payload) ||
                    `Request failed (${res.status})`;
                throw new Error(message);
            }

            setNotice({ type: "ok", text: "Thanks! Your message was sent successfully." });
            e.target.reset();
            setAgree(false);
        } catch (err) {
            setNotice({ type: "err", text: err.message || "Failed to send message." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            variants={sectionV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full bg-white"
        >
            {/* Decorative side portraits */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
                {/* Left */}
                <motion.div
                    className="absolute left-0 bottom-0 hidden md:block"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="relative h-[500px] w-72 rounded-full bg-sky-100">
                        <img
                            src={leftImage}
                            alt="Clinician"
                            className="absolute -left-6 bottom-0 h-[500px] w-72 object-cover rounded-full"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
                {/* Right */}
                <motion.div
                    className="absolute right-0 bottom-0 hidden md:block"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="relative h-[500px] w-72 rounded-full bg-emerald-200">
                        <img
                            src={rightImage}
                            alt="Clinician"
                            className="absolute right-0 bottom-0 h-[500px] w-72 object-cover rounded-full"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
                {/* Header */}
                <motion.div className="text-center mb-10 md:mb-12" variants={headerV}>
                    <p className="text-amber-500 font-semibold tracking-wide uppercase text-sm">Contact Us</p>
                    <h2 className="mt-3 text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-medium text-gray-900">
                        Connect With Divine Support Services
                        <br className="hidden sm:block" />
                        We’re Here To Help
                    </h2>
                </motion.div>

                {/* Top Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {/* Laurel Office */}
                    <motion.div
                        variants={cardV}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start gap-4">
                            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#D6E8EB] text-slate-700">
                                <MapPinIcon className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="font-semibold text-gray-900">Laurel Office</h3>
                                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                                    14201 Laurel Park Drive, Suite 206
                                    <br /> Laurel, MD 20707
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Baltimore Office */}
                    <motion.div
                        variants={cardV}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start gap-4">
                            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#D6E8EB] text-slate-700">
                                <MapPinIcon className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="font-semibold text-gray-900">Baltimore Office</h3>
                                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                                    3502 W. Rogers Avenue, Suite 8
                                    <br /> Baltimore, MD 21215
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    {/* Contacts */}
                    <motion.div
                        variants={cardV}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md"
                    >
                        <div className="flex items-start gap-4">
                            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#D6E8EB] text-slate-700">
                                <ContactIcon className="h-5 w-5" />
                            </span>

                            <div className="min-w-0">
                                <h3 className="font-semibold text-gray-900">Contacts</h3>

                                <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                                    {/* Email */}
                                    <li className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 shrink-0" />
                                        <a
                                            href="mailto:operations@divinesupportservicesinc.org"
                                            className="truncate underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded"
                                            aria-label="Email operations at Divine Support Services"
                                        >
                                            operations@divinesupportservicesinc.org
                                        </a>
                                    </li>

                                    {/* Phone 1 */}
                                    <li className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 shrink-0" />
                                        <a
                                            href="tel:+14432485410"
                                            className="transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded"
                                            aria-label="Call +1 (443) 248-5410"
                                        >
                                            +1 (443) 248-5410
                                        </a>
                                    </li>

                                    {/* Phone 2 */}
                                    <li className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 shrink-0" />
                                        <a
                                            href="tel:+18568794171"
                                            className="transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded"
                                            aria-label="Call +1 (856) 879-4171"
                                        >
                                            +1 (856) 879-4171
                                        </a>
                                    </li>

                                    {/* Phone 3 */}
                                    <li className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 shrink-0" />
                                        <a
                                            href="tel:+14109057473"
                                            className="transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded"
                                            aria-label="Call +1 (410) 905-7473"
                                        >
                                            +1 (410) 905-7473
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Form card */}
                <motion.div
                    variants={cardV}
                    className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm max-w-3xl mx-auto"
                >
                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">Send Us Message</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Strong communication teamwork skills enable collaboration
                        </p>
                    </div>

                    {/* Notice */}
                    {notice && (
                        <div
                            className={`mt-5 mb-4 rounded-xl px-4 py-3 text-sm ${notice.type === "ok"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                        >
                            {notice.text}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="mt-6 space-y-3">
                        <Field name="name" icon={UserIcon} placeholder="Name" />
                        <Field name="email" type="email" icon={MailIcon} placeholder="Email Address" />
                        <Field name="phone" type="tel" icon={PhoneIcon} placeholder="Phone" />
                        <Field name="website" type="url" icon={GlobeIcon} placeholder="Website" />
                        <Field name="message" as="textarea" icon={PencilIcon} placeholder="Write message" rows={4} />

                        <label className="mt-2 flex items-start gap-3 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                name="agree"
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            <span>I agree with company terms &amp; condition.</span>
                        </label>

                        <motion.button
                            type="submit"
                            disabled={loading || !agree}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-white text-sm font-semibold shadow overflow-hidden disabled:opacity-60"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                            <span className="relative">{loading ? "Sending..." : "Send Message"}</span>
                            <ArrowRight className="h-4 w-4 relative" />
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </motion.section>
    );
}

ContactBody.propTypes = {
    leftImage: PropTypes.string,
    rightImage: PropTypes.string,
};

ContactBody.defaultProps = {
    leftImage: leftImg,
    rightImage: rightImg,
};

/* ---------------- Field ---------------- */
function Field({ as, type, icon: Icon, placeholder, rows, name }) {
    const Tag = as === "textarea" ? "textarea" : "input";
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <Tag
                name={name}
                type={Tag === "input" ? type || "text" : undefined}
                placeholder={placeholder}
                rows={Tag === "textarea" ? rows || 4 : undefined}
                className="w-full rounded-full border border-gray-200 bg-gray-100/70 pl-12 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50"
            />
        </div>
    );
}
Field.propTypes = {
    as: PropTypes.oneOf(["input", "textarea"]),
    type: PropTypes.string,
    icon: PropTypes.elementType.isRequired,
    placeholder: PropTypes.string.isRequired,
    rows: PropTypes.number,
    name: PropTypes.string.isRequired,
};

/* ---------------- Icons ---------------- */
function ArrowRight({ className }) {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M4 10h10" strokeLinecap="round" />
            <path d="M10 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function MapPinIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <path d="M12 22s7-5.1 7-12a7 7 0 10-14 0c0 6.9 7 12 7 12z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}
function ContactIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <path d="M4 6h16v12H4z" />
            <path d="M4 9l8 5 8-5" />
        </svg>
    );
}
function MailIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <path d="M4 6h16v12H4z" />
            <path d="M4 8l8 6 8-6" />
        </svg>
    );
}
function PhoneIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <path d="M22 16.9v2a2 2 0 01-2.2 2 19 19 0 01-8.3-3.1 18.5 18.5 0 01-5.7-5.7A19 19 0 012.9 4.2 2 2 0 014.9 2h2a2 2 0 012 1.7c.1.9.3 1.7.6 2.5a2 2 0 01-.5 2.1L7.9 9.6a16 16 0 005.7 5.7l1.3-1.1a2 2 0 012.1-.5c.8.3 1.6.5 2.5.6a2 2 0 011.7 2.1z" />
        </svg>
    );
}
function UserIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20a8 8 0 0116 0" />
        </svg>
    );
}
function GlobeIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
        </svg>
    );
}
function PencilIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <path d="M3 17.3L14.4 5.9a2 2 0 012.8 0l.9.9a2 2 0 010 2.8L6.7 21H3v-3.7z" />
        </svg>
    );
}

ArrowRight.propTypes = { className: PropTypes.string };
MapPinIcon.propTypes = { className: PropTypes.string };
ContactIcon.propTypes = { className: PropTypes.string };
MailIcon.propTypes = { className: PropTypes.string };
PhoneIcon.propTypes = { className: PropTypes.string };
UserIcon.propTypes = { className: PropTypes.string };
GlobeIcon.propTypes = { className: PropTypes.string };
PencilIcon.propTypes = { className: PropTypes.string };
