/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const sectionV = {
    hidden: { opacity: 0, y: 8 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.06 },
    },
};

const headerV = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const imageV = {
    hidden: { opacity: 0, scale: 1.03 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease } },
};

const floatV = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease, delay: 0.2 },
    },
};

const cardV = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
};

export default function AboutVission({ imageSrc }) {
    return (
        <motion.section
            className="w-full bg-white"
            variants={sectionV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
                {/* Header */}
                <motion.div className="text-center mb-12 md:mb-16" variants={headerV}>
                    <p className="text-amber-500 font-semibold tracking-wide uppercase text-sm">Why Choose Us</p>
                    <h1 className="mt-3 text-2xl/tight sm:text-4xl/tight lg:text-5xl/tight font-medium text-gray-900">
                        We don't see your disabilities as inabilities.

                        <br className="hidden sm:block" />
                        <span className="block">We build on your strengths and work on your weaknesses</span>
                    </h1>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                    {/* Left: Feature Cards */}
                    <div className="flex flex-col gap-6">
                        {/* Card 1 */}
                        <FeatureCard
                            icon={<HandsIcon className="h-11 w-11 shrink-0 text-amber-500" />}
                            title="Who We Serve"
                            text="We serve individuals from ages 18 and older. We are dedicated to one to one(1:1), Small  Groups(1:4) and Large Groups (1:6)"
                        />

                        {/* Card 2 */}
                        <FeatureCard
                            icon={<MoneyBagIcon className="h-11 w-11 shrink-0 text-amber-500" />}
                            title="Personalized Support Plans"
                            text="Our services are tailored to each person’s unique goals from residential living to day programs and employment support."
                        />

                        {/* Card 3 */}
                        <FeatureCard
                            icon={<ShieldBoltIcon className="h-11 w-11 shrink-0 text-amber-500" />}
                            title="Trusted & Licensed Provider"
                            text="As a DDA-licensed provider across Central, Southern, and Western Maryland, families trust us to deliver quality, reliable, and safe care."
                        />
                    </div>

                    {/* Right: Image with Stats Card */}
                    <div className="relative">
                        <motion.img
                            src={imageSrc}
                            alt="Healthcare professionals"
                            className="w-full h-[440px] sm:h-[520px] object-cover rounded-2xl shadow-md"
                            loading="lazy"
                            variants={imageV}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 140, damping: 16 }}
                        />

                        {/* Stats Card */}
                        <motion.div
                            className="absolute right-0 -bottom-0 sm:-bottom-14 w-[90%] sm:w-[78%] md:w-[70%] rounded-2xl bg-sky-100/80 backdrop-blur supports-[backdrop-filter]:bg-sky-100/70 shadow-xl border border-sky-200 p-5 sm:p-6"
                            variants={floatV}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="pt-1 flex items-center gap-1 text-sky-700" aria-hidden="true">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.span key={i} initial={{ scale: 0.8, opacity: 0.7 }} animate={{ scale: [0.9, 1, 0.9], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}>
                                            <StarIcon className="h-4 w-4" />
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="flex items-baseline gap-2">
                                    <motion.p className="text-2xl font-extrabold tracking-tight text-gray-900" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                                        24 hours, 7 days a week of service delivery.
                                    </motion.p>
                                </div>
                                {/* <p className="mt-1 text-sm font-medium text-gray-700">Hours of Care Delivered Monthly</p> */}
                                <p className="mt-3 text-sm text-gray-600">
                                    By experienced and dedicated staff, committed to empowering independence and meaningful community life.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

AboutVission.propTypes = {
    imageSrc: PropTypes.string,
};

AboutVission.defaultProps = {
    imageSrc: "https://images.unsplash.com/photo-1584982751601-97dcc0972b30?q=80&w=2069&auto=format&fit=crop",
};

/** Feature Card **/
function FeatureCard({ icon, title, text }) {
    return (
        <motion.div
            className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm"
            variants={cardV}
            whileHover={{ y: -4, boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.35, ease }}
        >
            <motion.div className="grid place-items-center" initial={{ rotate: 0 }} whileHover={{ rotate: -6 }} transition={{ type: "spring", stiffness: 180, damping: 12 }}>
                {icon}
            </motion.div>
            <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-gray-600">{text}</p>
            </div>
        </motion.div>
    );
}

FeatureCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

/** Inline icons to match the style (amber stroke/line-art) **/
function HandsIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
            <path d="M8 10c-1.5 0-2.5-1.2-2.5-2.7V6.5A1.5 1.5 0 0 1 7 5h.5c.8 0 1.5.7 1.5 1.5V10z" />
            <path d="M16 10c1.5 0 2.5-1.2 2.5-2.7V6.5A1.5 1.5 0 0 0 17 5h-.5C15.7 5 15 5.7 15 6.5V10z" />
            <path d="M4.5 11.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5" />
            <path d="M9.5 13v1.5M14.5 13v1.5" />
        </svg>
    );
}

function MoneyBagIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5h6l-1.5-2h-3L9 5z" />
            <path d="M6.5 10.5c0-2.5 2-4.5 4.5-4.5h2c2.5 0 4.5 2 4.5 4.5v.2c0 1.1-.4 2.1-1 3l-2.2 3.2c-.7 1-1.9 1.6-3.1 1.6h-2.4c-1.2 0-2.4-.6-3.1-1.6L7.5 13.7c-.6-.9-1-1.9-1-3v-.2z" />
            <path d="M12 9.5c-1.1 0-2 .7-2 1.5s.9 1.5 2 1.5 2 .7 2 1.5-.9 1.5-2 1.5" />
        </svg>
    );
}

function ShieldBoltIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3l7 3v5c0 4.4-2.9 8.4-7 9.5C7.9 19.4 5 15.4 5 11V6l7-3z" />
            <path d="M13 9l-2.5 3H13l-2 4" />
        </svg>
    );
}

function StarIcon({ className }) {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 0 0-1.176 0L6.605 16.2c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.97 8.72c-.783-.57-.38-1.81.588-1.81h3.463a1 1 0 0 0 .95-.69l1.078-3.292z" />
        </svg>
    );
}

HandsIcon.propTypes = { className: PropTypes.string };
MoneyBagIcon.propTypes = { className: PropTypes.string };
ShieldBoltIcon.propTypes = { className: PropTypes.string };
StarIcon.propTypes = { className: PropTypes.string };
