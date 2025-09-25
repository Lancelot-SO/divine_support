// AboutResidence.jsx
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Home, HandHeart, Briefcase, Search, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const containerV = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
};

const cardV = {
    hidden: { opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease },
    },
};

const numV = {
    hidden: { opacity: 0, y: 8 },
    show: {
        opacity: 0.08,
        y: 0,
        transition: { duration: 0.7, ease, delay: 0.15 },
    },
};

function Card({ number, bgClass, icon, title, desc, ctaLabel, href = "#" }) {
    return (
        <motion.article
            variants={cardV}
            whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
            className={`group relative overflow-hidden rounded-3xl ${bgClass} ring-1 ring-black/5 shadow-sm p-6 md:p-8`}
        >
            {/* Watermark number */}
            <motion.span
                variants={numV}
                className="pointer-events-none select-none absolute right-4 md:right-6 top-2 md:top-1
                   text-[85px] md:text-[120px] font-extrabold leading-none text-black/5"
                aria-hidden="true"
            >
                {number}
            </motion.span>

            {/* Icon (gentle bob) */}
            <motion.div
                aria-hidden="true"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4 inline-block"
            >
                {icon}
            </motion.div>

            <h3 className="text-gray-900 font-semibold text-xl md:text-2xl leading-snug">
                {title}
            </h3>
            <p className="mt-3 text-gray-600 leading-7">{desc}</p>

            {/* CTA: amber gradient + white text when CARD is hovered */}
            <motion.a
                href={href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3
                   text-sm font-semibold border border-black/20 text-gray-900 bg-white shadow-sm
                   transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                   group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600
                   group-hover:text-white group-hover:border-transparent"
            >
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-white" />
            </motion.a>
        </motion.article>
    );
}

Card.propTypes = {
    number: PropTypes.string.isRequired,
    bgClass: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    desc: PropTypes.node.isRequired,
    ctaLabel: PropTypes.string.isRequired,
    href: PropTypes.string,
};

export default function AboutResidence({ className = "" }) {
    return (
        <section className={`px-4 md:px-6 mx-auto max-w-7xl py-12 ${className}`}>
            <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="grid gap-6 md:gap-7 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                <Card
                    number="01"
                    bgClass="bg-sky-50"
                    icon={<Home className="h-8 w-8 text-sky-500" strokeWidth={2.2} />}
                    title={
                        <>
                            Looking for Residential <br className="hidden sm:block" /> Support?
                        </>
                    }
                    desc={
                        <>
                            Safe and supportive community living homes, respite care, and
                            supported living to promote independence and dignity.
                        </>
                    }
                    ctaLabel="Explore Residential Services"
                    href="/residential"
                />

                <Card
                    number="02"
                    bgClass="bg-amber-50"
                    icon={<HandHeart className="h-8 w-8 text-amber-500" strokeWidth={2.2} />}
                    title="Need Personal Assistance?"
                    desc={
                        <>
                            From daily living skills to transportation and one-on-one care,
                            our team provides personalized support for every individual.
                        </>
                    }
                    ctaLabel="Discover Support Services"
                    href="/personal-support"
                />

                <Card
                    number="03"
                    bgClass="bg-sky-50"
                    icon={
                        <span className="relative inline-block">
                            <Briefcase className="h-8 w-8 text-sky-500" strokeWidth={2.2} />
                            <Search
                                className="h-3.5 w-3.5 text-sky-500 absolute -right-2 -bottom-1"
                                strokeWidth={2.2}
                            />
                        </span>
                    }
                    title={
                        <>
                            Interested in Day & <br className="hidden sm:block" />
                            Employment Programs?
                        </>
                    }
                    desc={
                        <>
                            Engaging day habilitation, community development, and job coaching
                            to help individuals build skills and thrive.
                        </>
                    }
                    ctaLabel="View Day Programs"
                    href="#"
                />
            </motion.div>
        </section>
    );
}

AboutResidence.propTypes = {
    className: PropTypes.string,
};
