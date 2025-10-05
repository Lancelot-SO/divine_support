/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";

// Swap to your real asset path
import supportImg from "../../assets/home/house.jpg";

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

export default function TrustedSupport({
    title = "Looking For Compassionate & Trusted Support Services?",
    bullets = ["Licensed DDA Provider in Maryland", "Experienced, Caring Professionals"],
    ctaText = "Get Support Today",
    ctaHref = "/contact",
    image = supportImg,
}) {
    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6 my-12">
            <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-black/5 shadow-sm"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: gradient content (no negative z-index; gradient applied directly) */}
                    <motion.div
                        variants={itemV}
                        className="relative order-2 lg:order-1 flex flex-col justify-center items-center bg-amber-500"
                    >
                        <div className="max-w-2xl text-white">
                            <motion.h2
                                variants={itemV}
                                className="text-2xl leading-tight font-extrabold sm:text-4xl md:text-5xl"
                            >
                                {title}
                            </motion.h2>

                            {/* Bullets */}
                            <motion.ul
                                variants={itemV}
                                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/95"
                            >
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5" aria-hidden />
                                    <span className="text-[15px] font-medium">{bullets[0]}</span>
                                </li>

                                {/* divider dot */}
                                <li className="hidden sm:block text-white/70">•</li>

                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5" aria-hidden />
                                    <span className="text-[15px] font-medium">{bullets[1]}</span>
                                </li>
                            </motion.ul>

                            {/* CTA */}
                            <motion.div variants={itemV} className="mt-8">
                                <motion.a
                                    href={ctaHref}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-amber-500 font-semibold shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {ctaText}
                                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: image */}
                    <div className="relative order-1 lg:order-2">
                        <motion.img
                            src={image}
                            alt="Comfortable home setting representing trusted support services"
                            className="h-full w-full object-cover lg:rounded-r-[28px]"
                            initial={{ scale: 1.06, x: 20, opacity: 0.85 }}
                            whileInView={{ scale: 1, x: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 1.1, ease }}
                            draggable="false"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

TrustedSupport.propTypes = {
    title: PropTypes.node,
    bullets: PropTypes.arrayOf(PropTypes.node),
    ctaText: PropTypes.string,
    ctaHref: PropTypes.string,
    image: PropTypes.string,
};
