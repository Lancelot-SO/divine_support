/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const sectionV = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.06 },
    },
};

const cardV = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
};

const iconV = {
    hidden: { opacity: 0, scale: 0.8, rotate: -6 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease } },
};

export default function ServicesAssessment({ items }) {
    const defaultItems = [
        {
            title: "Nursing\nAssessments",
            body:
                "Comprehensive intake and regular 45-day health reviews by our licensed nursing staff.",
            cta: "Request Nursing Support",
            href: "/nursing-support",
        },
        {
            title: "Behavioral\nSupport Plans",
            body:
                "Individualized assessments and strategies to encourage positive behaviors and community safety",
            cta: "Learn More",
            href: "/personal-support",
        },
        {
            title: "Life Skills Training",
            body:
                "Hands-on support with budgeting, hygiene, shopping, and daily living skills for greater independence.",
            cta: "Explore Programs",
            href: "/supported-living",
        },
        {
            title: "Community\nIntegration",
            body:
                "Guided participation in activities that reduce social anxiety, build friendships, and promote leadership.",
            cta: "Get Involved",
            href: "/community-development",
        },
    ];

    const cards = items && items.length ? items : defaultItems;

    return (
        <motion.section
            variants={sectionV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full overflow-hidden bg-[#e8f3fa]"
        >
            {/* Decorative animated background */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(closest-side,black,transparent)]"
                aria-hidden
                animate={{ opacity: [0.22, 0.34, 0.22], y: [0, -10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="absolute -left-24 -top-24 h-80 w-80 rotate-12 bg-[radial-gradient(circle_at_10px_10px,rgba(0,0,0,.08)_2px,transparent_3px)] [background-size:24px_24px] rounded-full" />
                <div className="absolute -right-28 -bottom-28 h-96 w-96 -rotate-12 bg-[radial-gradient(circle_at_10px_10px,rgba(0,0,0,.08)_2px,transparent_3px)] [background-size:24px_24px] rounded-full" />
            </motion.div>

            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 lg:py-20 relative">
                {/* Eyebrow */}
                <motion.p className="text-amber-500 font-semibold tracking-wide uppercase text-sm" variants={cardV}>
                    Assessments & Ongoing Support
                </motion.p>

                {/* Heading */}
                <motion.h2
                    className="mt-3 text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-extrabold text-gray-900 max-w-3xl"
                    variants={cardV}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease }}
                    >
                        Ensuring Quality Care
                    </motion.span>
                    <br />
                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease, delay: 0.05 }}
                    >
                        Through Personalized Plans
                    </motion.span>
                </motion.h2>

                {/* Cards */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {cards.map((c) => (
                        <motion.article
                            key={c.title}
                            variants={cardV}
                            whileHover={{ y: -6 }}
                            whileTap={{ scale: 0.995 }}
                            className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white/80 to-white/60 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 will-change-transform"
                        >
                            <motion.div className="text-sky-500" variants={iconV}>
                                <StethoIcon className="h-10 w-10" />
                            </motion.div>

                            <h3 className="mt-4 text-xl font-semibold text-gray-900 whitespace-pre-line">{c.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600">{c.body}</p>

                            <motion.a
                                href={c.href}
                                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-slate-700 hover:text-slate-900"
                                whileHover={{ x: 2 }}
                            >
                                {c.cta}
                                <motion.span
                                    aria-hidden
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 4 }}
                                    transition={{ type: "spring", stiffness: 250, damping: 16 }}
                                >
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </motion.span>
                            </motion.a>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

ServicesAssessment.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            cta: PropTypes.string.isRequired,
            href: PropTypes.string,
        })
    ),
};

function ArrowRight({ className }) {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M4 10h10" strokeLinecap="round" />
            <path d="M10 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
ArrowRight.propTypes = { className: PropTypes.string };

function StethoIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
            <path d="M6 5v4a4 4 0 0 0 8 0V5" />
            <path d="M10 13v3a5 5 0 0 0 10 0v-1" />
            <circle cx="19" cy="15" r="2" />
        </svg>
    );
}
StethoIcon.propTypes = { className: PropTypes.string };
