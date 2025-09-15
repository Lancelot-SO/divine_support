/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const sectionV = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.08 },
    },
};

const itemV = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const imageV = {
    hidden: { opacity: 0, scale: 1.04 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease } },
};

const cardV = {
    hidden: { opacity: 0, y: 16, scale: 0.98, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

const badgeV = {
    hidden: { opacity: 0, y: 6, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } },
};

export default function AboutSupport({ image, className = "" }) {
    return (
        <motion.section
            variants={sectionV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`px-4 md:px-6 mx-auto max-w-7xl py-10 md:py-14 ${className}`}
        >
            {/* Intro */}
            <motion.p variants={itemV} className="text-amber-500 font-semibold text-sm md:text-base">
                About Divine Support Services
            </motion.p>

            <motion.h2
                variants={itemV}
                className="mt-3 text-gray-900 font-medium tracking-tight
                   text-[28px] leading-[49px]
                   md:text-[36px] md:leading-[1.2]
                   lg:text-[36px] md:max-w-5xl"
            >
                We focus on person-centered care, compassionate support, and empowering
                individuals with intellectual and developmental disabilities to live
                with dignity, independence, and safety
            </motion.h2>

            <motion.p variants={itemV} className="mt-4 max-w-4xl text-gray-600 leading-8">
                At Divine Support Services, our mission is simple: treat every individual with the
                same respect and dignity we would want for ourselves. We provide a wide range of
                supports from residential living and personal assistance to employment coaching and
                day programs all designed to help people reach their goals and thrive in their communities.
            </motion.p>

            {/* Content row */}
            <div className="mt-8 grid gap-4 lg:grid-cols-2 items-stretch">
                {/* Left: image */}
                <motion.div
                    variants={itemV}
                    className="relative rounded-2xl overflow-hidden ring-1 ring-black/5 shadow"
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.35, ease }}
                >
                    {image ? (
                        <motion.img
                            variants={imageV}
                            src={image}
                            alt="Supportive care in action"
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-[280px] md:h-[340px] lg:h-[380px] bg-gradient-to-br from-gray-200 to-gray-400" />
                    )}
                    {/* soft vignette on top of image */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 0.8, ease }}
                        className="pointer-events-none absolute inset-0 bg-black"
                    />
                </motion.div>

                {/* Right: gradient card */}
                <motion.div
                    variants={cardV}
                    whileHover={{ y: -4 }}
                    className="relative group md:w-[619px] rounded-2xl shadow-md ring-1 ring-black/5 p-6 text-white
                     bg-gradient-to-r from-[#F09C13] via-[#E28C12] to-[#A85F0A]"
                >
                    {/* subtle shine on hover */}
                    <span className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background:
                                "radial-gradient(1200px 300px at 0% 0%, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%)"
                        }}
                    />

                    {/* Item 1 */}
                    <div className="relative flex items-start gap-4">
                        <motion.span
                            variants={badgeV}
                            className="inline-flex size-[50px] shrink-0 items-center justify-center
                         rounded-full border border-white/40 font-semibold leading-none"
                        >
                            1
                        </motion.span>

                        <div>
                            <motion.h3 variants={itemV} className="font-semibold text-lg">
                                Compassionate Support
                            </motion.h3>
                            <motion.p variants={itemV} className="mt-2 text-white/90 leading-7">
                                We create safe, caring environments where individuals are encouraged to make
                                choices, build confidence, and live meaningful lives.
                            </motion.p>
                        </div>
                    </div>

                    <motion.hr
                        variants={itemV}
                        className="my-6 border-white/30"
                    />

                    {/* Item 2 */}
                    <div className="relative flex items-start gap-4">
                        <motion.span
                            variants={badgeV}
                            className="inline-flex size-[50px] shrink-0 items-center justify-center
                         rounded-full border border-white/40 font-semibold leading-none"
                        >
                            2
                        </motion.span>

                        <div>
                            <motion.h3 variants={itemV} className="font-semibold text-lg">
                                Person-Centered Approach
                            </motion.h3>
                            <motion.p variants={itemV} className="mt-2 text-white/90 leading-7">
                                Every plan is tailored to the unique needs and dreams of the individual
                                promoting independence, growth, and self-determination.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

AboutSupport.propTypes = {
    image: PropTypes.string,
    className: PropTypes.string,
};
