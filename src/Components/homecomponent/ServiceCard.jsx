/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
    Home,
    HandHeart,
    Stethoscope,
    Trees,
    BriefcaseBusiness,
    Sun,
    ArrowUpRight,
    CheckCircle2,
} from "lucide-react";

// Swap to your own promo image
import promoImg from "../../assets/home/cardimg.jpg";

/* ------------------------- Animation Helpers ------------------------- */
const ease = [0.22, 1, 0.36, 1];

const containerV = {
    hidden: { opacity: 0, y: 12 },
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

/* Staggered reveal for the CARD GRID (one after another) */
const gridV = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.14, delayChildren: 0.08 },
    },
};

/* Each card’s animation (used by ServiceCard & PromoCard) */
const cardV = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/* ---------------------------- Default Data --------------------------- */
const defaultServices = [
    { title: "Residential Services", desc: "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.", Icon: Home, href: "#" },
    { title: "Personal Support", desc: "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.", Icon: HandHeart, href: "#" },
    { title: "Nursing Services", desc: "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.", Icon: Stethoscope, href: "#" },
    { title: "Community Development", desc: "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.", Icon: Trees, href: "#" },
    { title: "Employment Services", desc: "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.", Icon: BriefcaseBusiness, href: "#" },
    { title: "Day Habilitation", desc: "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.", Icon: Sun, href: "#" },
];

const defaultPromo = {
    image: promoImg,
    headline: (
        <>
            Looking for Support
            <br /> for Your Loved One?
        </>
    ),
    subcopy:
        "We’re here to help every step of the way with safe, reliable, and compassionate services across Maryland.",
    bullets: ["DDA Licensed Provider", "DDA Licensed Provider"],
    ctaText: "Make Appointment",
    ctaHref: "#",
};

/* ----------------------------- Components ---------------------------- */
export default function CardServices({ services = defaultServices, promo = defaultPromo }) {
    const list = (services && services.length ? services : defaultServices).slice(0, 6);

    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6 my-12">
            <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4EBEFF] via-[#01476F] to-[#38B6FF] text-white p-4 md:p-6 lg:p-8"
            >
                {/* Top label */}
                <motion.p variants={itemV} className="text-center text-xs font-semibold tracking-wider uppercase text-white/80">
                    Explore Our Services
                </motion.p>

                {/* Heading */}
                <motion.h2
                    variants={itemV}
                    className="mt-2 text-center font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl"
                >
                    Providing Compassionate Care
                    <br className="hidden sm:block" />
                    Across Maryland With Personalized
                    <br className="hidden sm:block" />
                    Supports For Every Individual
                </motion.h2>

                {/* Cards grid (stagger children on reveal) */}
                <motion.div
                    variants={gridV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
                >
                    {list.slice(0, 4).map((c) => (
                        <ServiceCard key={c.title} {...c} />
                    ))}

                    {list.slice(4, 6).map((c) => (
                        <ServiceCard key={c.title} {...c} />
                    ))}

                    {/* Promo card spans 2 columns on larger screens */}
                    <PromoCard {...promo} />
                </motion.div>
            </motion.div>
        </section>
    );
}

CardServices.propTypes = {
    services: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            Icon: PropTypes.elementType.isRequired,
            href: PropTypes.string,
        })
    ),
    promo: PropTypes.shape({
        image: PropTypes.string,
        headline: PropTypes.node,
        subcopy: PropTypes.node,
        bullets: PropTypes.arrayOf(PropTypes.node),
        ctaText: PropTypes.string,
        ctaHref: PropTypes.string,
    }),
};

function ServiceCard({ title, desc, Icon, href }) {
    return (
        <motion.article
            variants={cardV}
            whileHover={{ y: -4 }}
            className="h-full min-h-[320px] md:min-h-[360px] rounded-xl border border-white/30 bg-white/10 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        >
            {/* FLEX-COL: Title → Icon → Description → Link */}
            <div className="flex h-full flex-col items-start">
                {/* Title */}
                <h3 className="text-lg font-semibold text-white/95">{title}</h3>

                {/* Icon */}
                <span className="my-8 inline-flex h-10 w-10 items-center justify-center rounded-lg ">
                    <Icon className="h-[67px] w-[67px] text-amber-300" />
                </span>

                {/* Description (flex-1 pushes link to bottom) */}
                <p className="mt-3 text-sm leading-6 text-white/80 flex-1">{desc}</p>

                {/* Link */}
                <a
                    href={href || "#"}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                    View Details <ArrowUpRight className="h-4 w-4" />
                </a>
            </div>
        </motion.article>
    );
}


ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired, // a React component (icon)
    href: PropTypes.string,
};

ServiceCard.defaultProps = {
    href: "#",
};

function PromoCard({ image, headline, subcopy, bullets, ctaText, ctaHref }) {
    return (
        <motion.article
            variants={cardV}
            className="relative overflow-hidden h-full min-h-[320px] md:min-h-[360px] rounded-xl bg-black/20 ring-1 ring-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:col-span-2"
        >
            <img src={image} alt="Support for your loved one" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

            <div className="relative z-10 flex h-full flex-col p-5 md:p-6 lg:p-7">
                <h3 className="text-xl md:text-2xl font-extrabold text-white/95">{headline}</h3>
                <p className="mt-2 text-sm leading-6 text-white/85 max-w-[520px]">{subcopy}</p>

                <ul className="mt-4 space-y-2 text-white/90">
                    {(bullets || []).map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-amber-300" />
                            {b}
                        </li>
                    ))}
                </ul>

                <a
                    href={ctaHref || "#"}
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                    {ctaText} <ArrowUpRight className="h-4 w-4" />
                </a>
            </div>
        </motion.article>
    );
}

PromoCard.propTypes = {
    image: PropTypes.string,
    headline: PropTypes.node,
    subcopy: PropTypes.node,
    bullets: PropTypes.arrayOf(PropTypes.node),
    ctaText: PropTypes.string,
    ctaHref: PropTypes.string,
};

PromoCard.defaultProps = {
    image: defaultPromo.image,
    headline: defaultPromo.headline,
    subcopy: defaultPromo.subcopy,
    bullets: defaultPromo.bullets,
    ctaText: defaultPromo.ctaText,
    ctaHref: defaultPromo.ctaHref,
};
