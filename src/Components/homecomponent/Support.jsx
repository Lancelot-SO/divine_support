/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Home, HandHeart, Leaf, ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";

const cards = [
    {
        id: "01",
        Icon: Home,
        title: "Residential Support",
        body: (
            <>
                We provide community living homes, respite care, and supported living
                options designed to help individuals{" "}
                <span className="rounded bg-white/50 px-1">feel safe</span>,{" "}
                <span className="rounded bg-white/50 px-1">independent</span>, and
                empowered.
            </>
        ),
        cta: "Explore Residential Services",
        href: "/services/residential",
    },
    {
        id: "02",
        Icon: HandHeart,
        title: "Personal & Community Support",
        body: (
            <>
                From personal support to transportation and nursing care, our team is
                here to{" "}
                <span className="rounded bg-white/50 px-1">ensure every individual</span>{" "}
                has the tools and guidance to live with dignity.
            </>
        ),
        cta: "Discover Support Services",
        href: "/services/community",
    },
    {
        id: "03",
        Icon: Leaf,
        title: "Discover Support Services",
        body: (
            <>
                Through employment services, community activities, and day
                habilitation, we help individuals develop{" "}
                <span className="rounded bg-white/50 px-1">new skills</span>, gain
                confidence, and thrive in the community.
            </>
        ),
        cta: "See Day Programs",
        href: "/services/day-programs",
    },
];

const ease = [0.22, 1, 0.36, 1];

/* Staggered reveal when 40% in view */
const gridVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.16, delayChildren: 0.08 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease },
    },
};

const markVariants = {
    hidden: { scale: 1.05, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.7, ease, delay: 0.15 },
    },
};

export default function Support() {
    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6 my-8">
            <div className="rounded-3xl bg-[#E0F1FB] p-3 md:p-4">
                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }} // ← 40% into view
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                    {cards.map((c) => (
                        <Card key={c.id} {...c} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function Card({ id, Icon, title, body, cta, href }) {
    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/20 p-6 backdrop-blur-sm sm:p-7"
        >
            {/* Watermark number */}
            <motion.span
                variants={markVariants}
                aria-hidden
                className="pointer-events-none absolute right-4 top-5 select-none font-extrabold text-white/70"
                style={{ fontSize: "min(20vw, 180px)", lineHeight: 1 }}
            >
                {id}
            </motion.span>

            {/* Icon + content */}
            <div className="relative z-10">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100">
                    {/* If you want smaller icons like the reference, change to h-5 w-5 */}
                    <Icon className="h-[54px] w-[54px] text-sky-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>

                <p className="mb-6 max-w-[520px] text-[15px] leading-7 text-gray-600">{body}</p>

                <a
                    href={href}
                    className="group relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-sky-900 hover:text-sky-950"
                >
                    {cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-sky-900 transition-all duration-300 group-hover:w-full" />
                </a>
            </div>

            {/* subtle outline */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-sky-200/60" />
        </motion.article>
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    cta: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
};
