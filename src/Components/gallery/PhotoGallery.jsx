/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
const MotionLink = motion(Link);


import Photo1 from "../../assets/gallery/photo1.png";
import Photo2 from "../../assets/gallery/photo2.png";
import Photo3 from "../../assets/gallery/photo3.png";
import { Link } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1];

/* ---- define BEFORE usage ---- */
const defaultImages = [
    // repeat your 3 photos to get a fuller grid; replace or extend as you like
    Photo1,
    Photo2,
    Photo3,
    Photo2,
    Photo1,
    Photo3,
    Photo2,
    Photo3,
    Photo1,
];

export default function PhotoGallery({ images, title, ctaLabel, onViewMore }) {
    const [openIndex, setOpenIndex] = useState(null);

    // Normalize to [{src, alt}]
    const items = useMemo(
        () =>
            (images?.length ? images : defaultImages).map((it, i) =>
                typeof it === "string" ? { src: it, alt: `Event photo ${i + 1}` } : it
            ),
        [images]
    );

    // Keyboard navigation + ESC close
    useEffect(() => {
        if (openIndex === null) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpenIndex(null);
            if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
            if (e.key === "ArrowLeft")
                setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
        };
        document.addEventListener("keydown", onKey);

        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
            document.removeEventListener("keydown", onKey);
        };
    }, [openIndex, items.length]);

    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-10 md:py-14">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                        {title}
                    </h2>
                </div>

                {/* Masonry (CSS columns) */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6"
                >
                    {items.map((img, idx) => (
                        <motion.button
                            key={img.src + idx}
                            type="button"
                            onClick={() => setOpenIndex(idx)}
                            variants={{
                                hidden: { opacity: 0, y: 16 },
                                show: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.5, ease, delay: 0.035 * idx },
                                },
                            }}
                            whileHover={{ y: -4 }}
                            className="mb-4 md:mb-6 block w-full text-left break-inside-avoid group"
                            aria-label={`Open image ${idx + 1}`}
                        >
                            <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                                <motion.img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    className="w-full h-auto object-cover"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.35, ease }}
                                />
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* CTA */}
                <div className="mt-8 md:mt-10 text-center">
                    <MotionLink
                        to="https://flic.kr/ps/46PAWN"                 // <-- use `to`, not `href`
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onViewMore}           // (optional) keep your handler
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-white text-sm font-semibold"
                    >
                        {ctaLabel}
                        <svg
                            viewBox="0 0 20 20"
                            className="ml-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path d="M4 10h10" strokeLinecap="round" />
                            <path d="M10 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </MotionLink>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {openIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                        onClick={() => setOpenIndex(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.2 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        <motion.div
                            className="relative w-full max-w-4xl"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.98, y: 10, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1, transition: { duration: 0.25, ease } }}
                            exit={{ scale: 0.98, y: 10, opacity: 0, transition: { duration: 0.2 } }}
                        >
                            <img
                                src={items[openIndex].src}
                                alt={items[openIndex].alt}
                                className="w-full h-auto rounded-2xl object-contain max-h-[80vh] bg-white"
                            />

                            <div className="absolute inset-x-0 top-2 flex items-center justify-between px-2">
                                <button
                                    aria-label="Close"
                                    onClick={() => setOpenIndex(null)}
                                    className="rounded-full bg-white/90 hover:bg-white text-gray-900 px-3 py-1.5 text-sm font-semibold shadow"
                                >
                                    Close
                                </button>

                                <div className="flex items-center gap-2">
                                    <NavBtn
                                        label="Previous"
                                        onClick={() => setOpenIndex((i) => (i - 1 + items.length) % items.length)}
                                    >
                                        <ChevronLeft />
                                    </NavBtn>
                                    <NavBtn
                                        label="Next"
                                        onClick={() => setOpenIndex((i) => (i + 1) % items.length)}
                                    >
                                        <ChevronRight />
                                    </NavBtn>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

PhotoGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({ src: PropTypes.string.isRequired, alt: PropTypes.string }),
        ])
    ),
    title: PropTypes.string,
    ctaLabel: PropTypes.string,
    onViewMore: PropTypes.func,
};

PhotoGallery.defaultProps = {
    images: defaultImages, // safe now: defined above
    title: "Some notable Events",
    ctaLabel: "View More",
    onViewMore: () => { },
};

/* ---------- helpers ---------- */

function NavBtn({ children, label, onClick }) {
    return (
        <button
            aria-label={label}
            onClick={onClick}
            className="rounded-full bg-white/90 hover:bg-white text-gray-900 p-2 shadow"
            type="button"
        >
            {children}
        </button>
    );
}
NavBtn.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

function ChevronLeft() {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function ChevronRight() {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M8 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
