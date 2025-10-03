/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

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

export default function Hero() {
    const sliderRef = useRef(null);

    const getListEl = () => sliderRef.current?.innerSlider?.list ?? null;

    const pauseAll = () => {
        const list = getListEl();
        if (!list) return;
        list.querySelectorAll("video").forEach((v) => {
            try { v.pause(); v.currentTime = 0; } catch {
                //ignore
            }
        });
    };

    // Robust autoplay for the CURRENT visible slide
    const playCurrent = () => {
        const list = getListEl();
        if (!list) return;
        const vid = list.querySelector(".slick-current video");
        if (!vid) return;

        // Harden for iOS/Safari
        vid.muted = true;
        vid.setAttribute("muted", "");
        vid.playsInline = true;
        vid.setAttribute("playsinline", "");

        const tryPlay = () => vid.play().catch(() => { });
        if (vid.readyState >= 2) {
            tryPlay();
        } else {
            // retry once render/layout stabilizes
            requestAnimationFrame(() => {
                if (vid.readyState >= 2) tryPlay();
                else vid.addEventListener("loadeddata", tryPlay, { once: true });
            });
        }
    };

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: false,          // we control it
        waitForAnimate: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        pauseOnHover: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: false,
        onInit: () => {
            pauseAll();
            playCurrent();          // autoplay first visible video (on load)
        },
        beforeChange: () => {
            pauseAll();             // stop outgoing video immediately
        },
        afterChange: () => {
            playCurrent();          // autoplay the new slide right away (arrow/swipe)
        },
    };

    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl ring-2 ring-sky-500/70 shadow-lg">
                <Slider ref={sliderRef} {...settings}>
                    {slides.map((s) => (
                        <div key={s.id}>
                            <div className="relative h-[40vh] min-h-[620px] md:h-[80vh]">
                                <motion.video
                                    className="absolute inset-0 h-full w-full object-cover"
                                    // only required attributes
                                    muted
                                    playsInline
                                    controls={false}
                                    // auto-advance when a video ends
                                    onEnded={() => sliderRef.current?.slickNext?.()}
                                    initial={false}
                                    animate={{ scale: 1.06 }}
                                    transition={{ duration: 6, ease: "linear" }}
                                >
                                    <source src={s.src} type="video/mp4" />
                                </motion.video>

                                <motion.div
                                    className="absolute inset-0 bg-black/35"
                                    initial={false}
                                    animate={{ opacity: 0.35 }}
                                    transition={{ duration: 0.6, ease }}
                                />

                                <div className="relative z-10 flex h-full items-center justify-center px-4">
                                    <div className="text-center">
                                        <h1 className="mx-auto max-w-5xl font-extrabold tracking-tight text-white
                      text-2xl leading-tight md:text-6xl md:leading-[1.1] xl:text-7xl">
                                            {s.title}
                                        </h1>

                                        <div className="mt-8">
                                            <a
                                                href={s.ctaHref}
                                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-white font-semibold shadow-md hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                            >
                                                {s.ctaText} <span aria-hidden>↗</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
