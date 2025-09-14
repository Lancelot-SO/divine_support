/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// TEMP image: swap to your real asset path
import missionImg from "../../assets/home/missionimg.png";

const ease = [0.22, 1, 0.36, 1];

const containerV = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease, when: "beforeChildren", staggerChildren: 0.08 },
    },
};
const itemV = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function Mission() {
    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6 my-12">
            <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-sm"
            >
                {/* honeycomb accents */}
                <motion.svg
                    aria-hidden
                    width="420"
                    height="420"
                    viewBox="0 0 420 420"
                    className="pointer-events-none absolute -top-10 -left-6 opacity-20 text-gray-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 0.35, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                >
                    <defs>
                        <pattern id="hex" width="34" height="30" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
                            <path d="M17 0l17 10v20l-17 10L0 30V10z" fill="currentColor" opacity="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hex)" />
                </motion.svg>

                <motion.svg
                    aria-hidden
                    width="420"
                    height="420"
                    viewBox="0 0 420 420"
                    className="pointer-events-none absolute -bottom-8 -right-6 opacity-20 text-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 0.35, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease }}
                >
                    <defs>
                        <pattern id="hex2" width="34" height="30" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
                            <path d="M17 0l17 10v20l-17 10L0 30V10z" fill="currentColor" opacity="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hex2)" />
                </motion.svg>

                <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                    {/* Eyebrow */}
                    <motion.p
                        variants={itemV}
                        className="mb-3 text-[15px] font-semibold text-amber-500"
                    >
                        About Divine Support Services
                    </motion.p>

                    {/* Title */}
                    <motion.h2
                        variants={itemV}
                        className="max-w-4xl text-2xl leading-[1.25] font-medium text-gray-900
                       md:text-5xl md:leading-[1.15]"
                    >
                        Our Mission Is To Support Individuals With Intellectual And
                        Developmental Disabilities With Dignity, Respect, And Care.
                    </motion.h2>

                    {/* Content grid */}
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:items-start">
                        {/* Image */}
                        <motion.div
                            variants={itemV}
                            className="relative overflow-hidden rounded-2xl shadow-md"
                        >
                            <motion.img
                                src={missionImg}
                                alt="Individuals receiving compassionate care"
                                className="h-full w-full object-cover"
                                initial={{ scale: 1.06 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease }}
                            />
                            {/* tiny clipped corner accent to mimic screenshot bevel */}
                            <span className="pointer-events-none absolute right-0 top-0 h-8 w-8 rounded-bl-2xl bg-black/10" />
                        </motion.div>

                        {/* Right column */}
                        <div className="md:w-[504px] 4xl:w-full w-full">
                            <motion.p
                                variants={itemV}
                                className="text-[15.5px] leading-7 text-gray-600"
                            >
                                Divine Support Services Inc. (DSS) is committed to helping
                                individuals achieve their goals, build self-esteem, and live
                                safely. We support their choices, encourage independence, and
                                empower them to live happy, fulfilling lives.
                            </motion.p>

                            {/* Feature chips */}
                            <motion.ul
                                variants={itemV}
                                className="mt-6 flex flex-col gap-4"
                            >
                                <li>
                                    <Chip number="1" label="Compassionate Support" />
                                </li>
                                <li>
                                    <Chip number="2" label="Person-Centered Care" />
                                </li>
                            </motion.ul>

                            {/* CTA */}
                            <motion.div variants={itemV} className="mt-7">
                                <a
                                    href="/about"
                                    className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-white font-semibold shadow-sm hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                >
                                    Learn more us
                                    <ArrowUpRight
                                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        aria-hidden
                                    />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

import PropTypes from "prop-types";

/* ------- Small helper chip ------- */
function Chip({ number, label }) {
    const chip = {
        rest: { y: 0 },
        hover: { y: -2, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
    };
    const fill = {
        rest: { scaleX: 0 },
        hover: { scaleX: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    };
    const text = {
        rest: { color: "rgb(17 24 39)" }, // gray-900
        hover: { color: "#fff" },
    };
    const circle = {
        rest: { color: "rgb(17 24 39)", borderColor: "rgba(0,0,0,.2)", backgroundColor: "transparent" },
        hover: { color: "#fff", borderColor: "rgba(255,255,255,.6)", backgroundColor: "rgba(255,255,255,.06)" },
    };

    return (
        <motion.div
            variants={chip}
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="relative overflow-hidden rounded-xl border border-black/10 bg-white"
        >
            {/* Sliding amber fill */}
            <motion.span
                variants={fill}
                className="absolute inset-0 origin-left bg-amber-500"
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                <motion.span
                    variants={circle}
                    className="grid h-9 w-9 place-items-center rounded-full border text-[15px] font-semibold"
                >
                    {number}
                </motion.span>

                <motion.span variants={text} className="text-[15px] font-semibold">
                    {label}
                </motion.span>
            </div>
        </motion.div>
    );
}


Chip.propTypes = {
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
};
