/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Team.jsx
 * - Avatar image per member (local imports or URLs)
 * - 3 social icons: LinkedIn, X/Twitter, Instagram
 * - Staggered reveal, hover lift, 3D tilt, animated halo
 * - NEW: Right-side sliding panel with larger photo & details on card click
 */

// ---- Local images (swap these for your assets) ----
import T1 from "../assets/gallery/photo2.png";
import T2 from "../assets/gallery/photo2.png";
import T3 from "../assets/gallery/photo2.png";
import T4 from "../assets/gallery/photo2.png";
import T5 from "../assets/gallery/photo2.png";
import T6 from "../assets/gallery/photo2.png";

const ease = [0.22, 1, 0.36, 1];

const sectionV = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease, when: "beforeChildren", staggerChildren: 0.08 },
    },
};

const headerV = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const cardV = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
};

export default function Team({ title, subtitle, members }) {
    const team = members && members.length ? members : defaultTeam;

    // Drawer state
    const [selected, setSelected] = useState(null);

    // ESC key + body scroll lock when drawer is open
    useEffect(() => {
        if (!selected) return;
        const onKey = (e) => e.key === "Escape" && setSelected(null);
        document.addEventListener("keydown", onKey);
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = original;
        };
    }, [selected]);

    return (
        <>
            <motion.section
                variants={sectionV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-full overflow-hidden bg-white"
            >
                {/* Decorative animated background */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(closest-side,black,transparent)]"
                    animate={{ opacity: [0.22, 0.34, 0.22], y: [0, -10, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute -left-24 -top-24 h-80 w-80 rotate-12 bg-[radial-gradient(circle_at_10px_10px,rgba(0,0,0,.06)_2px,transparent_3px)] [background-size:24px_24px] rounded-full" />
                    <div className="absolute -right-28 -bottom-28 h-96 w-96 -rotate-12 bg-[radial-gradient(circle_at_10px_10px,rgba(0,0,0,.06)_2px,transparent_3px)] [background-size:24px_24px] rounded-full" />
                </motion.div>

                <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
                    {/* Header */}
                    <motion.div className="text-center mb-10 md:mb-14" variants={headerV}>
                        <p className="text-amber-500 font-semibold tracking-wide uppercase text-sm">Our Team</p>
                        <h2 className="mt-3 text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-medium text-gray-900">
                            {title}
                        </h2>
                        {subtitle ? (
                            <p className="mx-auto mt-3 max-w-2xl text-gray-600 text-sm sm:text-base">{subtitle}</p>
                        ) : null}
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {team.map((m) => (
                            <TiltCard key={m.name}>
                                <motion.article
                                    variants={cardV}
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                    className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-amber-400/60 via-amber-200/40 to-transparent cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelected(m)}
                                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(m)}
                                >
                                    <div className="relative rounded-2xl bg-white p-6 pt-14 shadow-sm">
                                        {/* Floating avatar */}
                                        <motion.div
                                            className="absolute -top-10 left-1/2 -translate-x-1/2"
                                            animate={{ y: [0, -3, 0] }}
                                            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <div className="relative">
                                                <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-md transition-opacity duration-300 group-hover:opacity-90" />
                                                <img
                                                    src={m.photo}
                                                    alt={`${m.name} portrait`}
                                                    className="relative h-20 w-20 rounded-full object-cover ring-4 ring-white shadow-md"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Content */}
                                        <div className="text-center mt-6">
                                            <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                                            <p className="text-amber-600 text-sm font-medium">{m.role}</p>
                                            {m.bio ? (
                                                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">{m.bio}</p>
                                            ) : null}

                                            {/* Socials: LinkedIn, X/Twitter, Instagram */}
                                            {(m.socials?.linkedin || m.socials?.twitter || m.socials?.instagram) && (
                                                <div className="mt-5 flex items-center justify-center gap-3">
                                                    {m.socials?.linkedin && (
                                                        <motion.a
                                                            href={m.socials.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            initial={{ opacity: 0, y: 6 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            whileHover={{ y: -2 }}
                                                            transition={{ duration: 0.4, ease }}
                                                            aria-label={`${m.name} on LinkedIn`}
                                                            className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-gray-200 bg-white text-slate-700 hover:text-slate-900"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <LinkedInIcon className="h-4.5 w-4.5" />
                                                        </motion.a>
                                                    )}
                                                    {m.socials?.twitter && (
                                                        <motion.a
                                                            href={m.socials.twitter}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            initial={{ opacity: 0, y: 6 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            whileHover={{ y: -2 }}
                                                            transition={{ duration: 0.45, ease, delay: 0.05 }}
                                                            aria-label={`${m.name} on X/Twitter`}
                                                            className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-gray-200 bg-white text-slate-700 hover:text-slate-900"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <TwitterIcon className="h-4.5 w-4.5" />
                                                        </motion.a>
                                                    )}
                                                    {m.socials?.instagram && (
                                                        <motion.a
                                                            href={m.socials.instagram}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            initial={{ opacity: 0, y: 6 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            whileHover={{ y: -2 }}
                                                            transition={{ duration: 0.45, ease, delay: 0.1 }}
                                                            aria-label={`${m.name} on Instagram`}
                                                            className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-gray-200 bg-white text-slate-700 hover:text-slate-900"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <InstagramIcon className="h-4.5 w-4.5" />
                                                        </motion.a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ---------- Slide-in Drawer ---------- */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setSelected(null)}
                        />

                        {/* Panel */}
                        <motion.aside
                            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0, transition: { duration: 0.35, ease } }}
                            exit={{ x: "100%", transition: { duration: 0.28, ease } }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                                <div className="min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{selected.name}</h3>
                                    <p className="text-sm text-amber-600">{selected.role}</p>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 hover:bg-gray-200"
                                    aria-label="Close panel"
                                >
                                    <CloseIcon className="h-5 w-5 text-gray-700" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-5 pb-8 pt-4 overflow-y-auto h-[calc(100%-64px)]">
                                <div className="relative">
                                    <img
                                        src={selected.photo}
                                        alt={`${selected.name} large portrait`}
                                        className="w-full h-56 object-cover rounded-xl"
                                    />
                                </div>

                                <div className="mt-5">
                                    <h4 className="text-base font-semibold text-gray-900">About {selected.name.split(" ")[0]}</h4>
                                    {selected.bio ? (
                                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                                            {selected.bio}
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                                            Dedicated team member supporting our mission with care and excellence.
                                        </p>
                                    )}
                                </div>

                                {/* Socials (bigger) */}
                                {(selected.socials?.linkedin || selected.socials?.twitter || selected.socials?.instagram) && (
                                    <div className="mt-6">
                                        <p className="text-sm font-semibold text-gray-900">Connect</p>
                                        <div className="mt-3 flex items-center gap-3">
                                            {selected.socials?.linkedin && (
                                                <a
                                                    href={selected.socials.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-gray-200 bg-white text-slate-700 hover:text-slate-900"
                                                >
                                                    <LinkedInIcon className="h-5 w-5" />
                                                </a>
                                            )}
                                            {selected.socials?.twitter && (
                                                <a
                                                    href={selected.socials.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-gray-200 bg-white text-slate-700 hover:text-slate-900"
                                                >
                                                    <TwitterIcon className="h-5 w-5" />
                                                </a>
                                            )}
                                            {selected.socials?.instagram && (
                                                <a
                                                    href={selected.socials.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-gray-200 bg-white text-slate-700 hover:text-slate-900"
                                                >
                                                    <InstagramIcon className="h-5 w-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

Team.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    members: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            photo: PropTypes.string.isRequired, // local import or URL
            bio: PropTypes.string,
            socials: PropTypes.shape({
                linkedin: PropTypes.string,
                twitter: PropTypes.string,
                instagram: PropTypes.string,
            }),
        })
    ),
};

Team.defaultProps = {
    title: "Meet the People Behind the Care",
    subtitle: "A passionate, multidisciplinary team dedicated to quality, dignity, and impact.",
};

/* ---------------- Tilt wrapper ---------------- */
function TiltCard({ children }) {
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 140, damping: 12 });
    const sy = useSpring(my, { stiffness: 140, damping: 12 });
    const rotateX = useTransform(sy, [-15, 15], [8, -8]);
    const rotateY = useTransform(sx, [-15, 15], [-8, 8]);

    const onMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        mx.set((px - 0.5) * 30);
        my.set((py - 0.5) * 30);
    };

    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="will-change-transform"
        >
            {children}
        </motion.div>
    );
}
TiltCard.propTypes = { children: PropTypes.node.isRequired };

/* ---------------- Icons ---------------- */
function TwitterIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M20.7 7.2c.5 7-4.6 11.1-10.4 11.1-2.1 0-4-.6-5.6-1.6 2 .2 4-.3 5.6-1.6-1.7 0-3.1-1.2-3.6-2.7.6.1 1.2.1 1.8-.1-1.8-.4-3.1-2-3.1-3.9.5.3 1.1.5 1.8.6-1.7-1.2-2.2-3.4-1.2-5.1 2 2.5 5.1 4.1 8.5 4.3-.5-2.1 1.1-4 3.2-4 1 0 2 .4 2.6 1.1.8-.2 1.5-.5 2.2-.9-.3.9-.9 1.6-1.7 2.1.7-.1 1.3-.3 1.9-.5z" />
        </svg>
    );
}
TwitterIcon.propTypes = { className: PropTypes.string };

function LinkedInIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.8 2.6 4.8 6V24h-4v-7.2c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-4V8z" />
        </svg>
    );
}
LinkedInIcon.propTypes = { className: PropTypes.string };

function InstagramIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm6-2.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
        </svg>
    );
}
InstagramIcon.propTypes = { className: PropTypes.string };

function CloseIcon({ className }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
            <path d="M6.2 6.2a1 1 0 011.4 0L10 8.6l2.4-2.4a1 1 0 111.4 1.4L11.4 10l2.4 2.4a1 1 0 11-1.4 1.4L10 11.4l-2.4 2.4a1 1 0 11-1.4-1.4L8.6 10 6.2 7.6a1 1 0 010-1.4z" />
        </svg>
    );
}
CloseIcon.propTypes = { className: PropTypes.string };

/* ---------------- Default data ---------------- */
const defaultTeam = [
    {
        name: "Ava Thompson",
        role: "Director of Nursing",
        photo: T1, // local asset
        bio: "Leads care standards and clinical training across all programs.",
        socials: {
            linkedin: "https://www.linkedin.com/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/",
        },
    },
    {
        name: "Marcus Reed",
        role: "Behavioral Specialist",
        photo: T2,
        bio: "Designs supportive plans focused on safety, dignity, and growth.",
        socials: {
            linkedin: "https://www.linkedin.com/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/",
        },
    },
    {
        name: "Priya Desai",
        role: "Community Programs Lead",
        photo: T3,
        bio: "Builds bridges to inclusive community activities and partnerships.",
        socials: {
            linkedin: "https://www.linkedin.com/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/",
        },
    },
    {
        name: "Liam Chen",
        role: "Employment Coach",
        photo: T4,
        bio: "Coaches job seekers on confidence, skills, and workplace readiness.",
        socials: {
            linkedin: "https://www.linkedin.com/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/",
        },
    },
    {
        name: "Nora Williams",
        role: "Residential Coordinator",
        photo: T5,
        bio: "Ensures safe, supportive homes and personalized care planning.",
        socials: {
            linkedin: "https://www.linkedin.com/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/",
        },
    },
    {
        name: "Diego Rivera",
        role: "Registered Nurse",
        photo: T6,
        bio: "Coordinates medical appointments and health monitoring.",
        socials: {
            linkedin: "https://www.linkedin.com/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/",
        },
    },
];
