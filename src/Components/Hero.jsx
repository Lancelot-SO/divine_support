/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Replace with your real images
import hero1 from "../assets/home/hero1.png";
import hero2 from "../assets/home/hero1.png";
import hero3 from "../assets/home/hero1.png";

const slides = [
    {
        id: 1,
        image: hero1,
        title:
            "DDA Licensed providers for Individuals with Intellectual and Developmental Disabilities",
        ctaText: "Explore Our Services",
        ctaHref: "/services",
    },
    {
        id: 2,
        image: hero2,
        title:
            "Person-Centered Supports that build Community, Dignity, and Independence",
        ctaText: "Explore Our Services",
        ctaHref: "/services",
    },
    {
        id: 3,
        image: hero3,
        title:
            "Trusted Care. Real Outcomes. For People with I/DD and their Families",
        ctaText: "Explore Our Services",
        ctaHref: "/services",
    },
];

import PropTypes from "prop-types";

function PrevArrow({ onClick }) {
    return (
        <button
            type="button"
            aria-label="Previous slide"
            onClick={onClick}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full bg-white hover:bg-amber-500 text-gray-900 shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
            <ChevronLeft className="h-6 w-6" />
        </button>
    );
}
PrevArrow.propTypes = { onClick: PropTypes.func };

function NextArrow({ onClick }) {
    return (
        <button
            type="button"
            aria-label="Next slide"
            onClick={onClick}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full bg-white hover:bg-amber-500 text-gray-900 shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
            <ChevronRight className="h-6 w-6" />
        </button>
    );
}
NextArrow.propTypes = { onClick: PropTypes.func };

/** Framer variants */
const ease = [0.22, 1, 0.36, 1];
const containerV = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.08 },
    },
};
const titleV = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const ctaV = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease, delay: 0.05 },
    },
};

export default function Hero() {
    const [active, setActive] = useState(0);

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: false,
        afterChange: (i) => setActive(i), // tells us which slide is active
    };

    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl ring-2 ring-sky-500/70 shadow-lg">
                <Slider {...settings}>
                    {slides.map((s, i) => {
                        const isActive = i === active;
                        return (
                            <div key={s.id}>
                                <div className="relative h-[40vh] min-h-[620px] md:h-[80vh]">
                                    {/* Image with subtle Ken-Burns on the active slide */}
                                    <motion.img
                                        src={s.image}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover"
                                        draggable="false"
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1.08 : 1.02,
                                        }}
                                        transition={{ duration: 6, ease: "linear" }}
                                    />

                                    {/* Slightly animated overlay for depth */}
                                    <motion.div
                                        className="absolute inset-0 bg-black/30"
                                        initial={false}
                                        animate={{ opacity: isActive ? 0.35 : 0.28 }}
                                        transition={{ duration: 0.6, ease }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 flex h-full items-center justify-center px-4">
                                        <motion.div
                                            variants={containerV}
                                            initial="hidden"
                                            animate={isActive ? "visible" : "hidden"}
                                            className="text-center"
                                        >
                                            <motion.h1
                                                variants={titleV}
                                                className="mx-auto max-w-5xl font-extrabold tracking-tight text-white
                                   text-2xl leading-tight
                                   md:text-6xl md:leading-[1.1]
                                   xl:text-7xl"
                                            >
                                                {s.title}
                                            </motion.h1>

                                            <motion.div variants={ctaV} className="mt-8">
                                                <motion.a
                                                    href={s.ctaHref}
                                                    className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-white font-semibold shadow-md hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                                    whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,.18)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {s.ctaText} <span aria-hidden>↗</span>
                                                </motion.a>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </section>
    );
}
