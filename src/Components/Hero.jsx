/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

// Real videos
import heroVid1 from "../assets/home/vid1.mp4";
import heroVid2 from "../assets/home/vid2.mp4";

const slides = [
    { id: 1, src: heroVid1, title: "Complete Health Solutions Because You Deserve The Best", ctaText: "EXPLORE OUR DDA SERVICES", ctaHref: "/services" },
    { id: 2, src: heroVid2, title: "Person-Centered Supports that build Community, Dignity, and Independence", ctaText: "Explore Our Services", ctaHref: "/services" },
];

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

const ease = [0.22, 1, 0.36, 1];
const containerV = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.08 } },
};
const titleV = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const ctaV = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease, delay: 0.05 } },
};

export default function Hero() {
    const [active, setActive] = useState(0);
    const sliderRef = useRef(null);
    const videoRefs = useRef([]);

    // Play only the active slide's video; pause/reset the others
    useEffect(() => {
        videoRefs.current.forEach((vid, idx) => {
            if (!vid) return;
            if (idx === active) {
                const playIt = () => vid.play().catch(() => { });
                if (vid.readyState >= 2) playIt();
                else vid.addEventListener("loadeddata", playIt, { once: true });
            } else {
                try {
                    vid.pause();
                    vid.currentTime = 0;
                } catch {
                    //ignore
                }
            }
        });
    }, [active]);

    const settings = {
        arrows: true, // set to false if you want zero UI
        dots: false,
        infinite: true,
        loop: true,
        speed: 600,
        autoplay: true, // we control via video end + effects
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: false,
        onInit: () => {
            // Autoplay first video on load
            const first = videoRefs.current[0];
            if (first) {
                const playIt = () => first.play().catch(() => { });
                if (first.readyState >= 2) playIt();
                else first.addEventListener("loadeddata", playIt, { once: true });
            }
        },
        beforeChange: (current) => {
            const outVid = videoRefs.current[current];
            if (outVid) {
                try {
                    outVid.pause();
                    outVid.currentTime = 0;
                } catch {
                    //ignore
                }
            }
        },
        afterChange: (i) => setActive(i),
    };

    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl ring-2 ring-sky-500/70 shadow-lg">
                <Slider ref={sliderRef} {...settings}>
                    {slides.map((s, i) => {
                        const isActive = i === active;
                        return (
                            <div key={s.id}>
                                <div className="relative h-[40vh] min-h-[620px] md:h-[80vh]">
                                    <motion.video
                                        ref={(el) => (videoRefs.current[i] = el)}
                                        className="absolute inset-0 h-full w-full object-cover"
                                        // ——— Only the specified attributes ———
                                        muted
                                        playsInline
                                        controls={false}
                                        autoPlay={isActive}
                                        onEnded={() => sliderRef.current?.slickNext?.()}
                                        // ——— Presentation (Framer Motion) ———
                                        initial={false}
                                        animate={{ scale: isActive ? 1.06 : 1.0 }}
                                        transition={{ duration: 6, ease: "linear" }}
                                    >
                                        <source src={s.src} type="video/mp4" />
                                    </motion.video>

                                    <motion.div
                                        className="absolute inset-0 bg-black/35"
                                        initial={false}
                                        animate={{ opacity: isActive ? 0.35 : 0.28 }}
                                        transition={{ duration: 0.6, ease }}
                                    />

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
                          text-2xl leading-tight md:text-6xl md:leading-[1.1] xl:text-7xl"
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
