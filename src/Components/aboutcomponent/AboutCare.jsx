// AboutCare.jsx
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { HeartHandshake, Stethoscope, UsersRound, HeartPulse } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const sectionV = {
    hidden: { opacity: 0, y: 8 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.06 },
    },
};

const imageV = {
    hidden: { opacity: 0, scale: 1.05 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease } },
};

const cardV = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

const itemV = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function AboutCare({ image, className = "" }) {
    return (
        <motion.section
            variants={sectionV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`relative px-4 md:px-6 mx-auto max-w-7xl py-10 md:py-14 mt-10 ${className}`}
        >
            <motion.div
                variants={itemV}
                className=" rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md"
            >
                {/* Background image with subtle Ken-Burns */}
                {image ? (
                    <motion.img
                        variants={imageV}
                        src={image}
                        alt="Our care team"
                        className="relative z-0 w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="relative z-0 w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] bg-gradient-to-br from-gray-200 to-gray-400" />
                )}

                {/* Overlay card (centered, animated slide-up)
            - On mobile: sits INSIDE the image (bottom-4)
            - On md+: floats slightly outside (-bottom-10) */}
                <motion.div
                    variants={cardV}
                    className="absolute inset-x-4 bottom-4 md:-bottom-10 z-10"
                >
                    <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3, ease }}
                        className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 md:p-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Item 1 */}
                            <motion.div variants={itemV} className="flex items-start gap-4">
                                <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                                    <motion.span
                                        animate={{ y: [0, -2, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <HeartHandshake className="h-6 w-6 text-amber-500" strokeWidth={2.2} />
                                    </motion.span>
                                </span>
                                <div>
                                    <h3 className="text-gray-900 font-semibold text-lg">Compassionate Care</h3>
                                    <p className="mt-2 text-gray-600 leading-7">
                                        We treat every individual with dignity and respect, fostering safe and
                                        supportive environments where they can thrive.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Item 2 */}
                            <motion.div variants={itemV} className="flex items-start gap-4">
                                <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                                    <motion.span
                                        animate={{ y: [0, -2, 0] }}
                                        transition={{
                                            duration: 3.2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.15,
                                        }}
                                    >
                                        <Stethoscope className="h-6 w-6 text-amber-500" strokeWidth={2.2} />
                                    </motion.span>
                                </span>
                                <div>
                                    <h3 className="text-gray-900 font-semibold text-lg">
                                        Individualized Support Plans
                                    </h3>
                                    <p className="mt-2 text-gray-600 leading-7">
                                        Our services are person-centered, tailored to each individual's unique needs,
                                        goals, and dreams.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Item 3 */}
                            <motion.div variants={itemV} className="flex items-start gap-4">
                                <span className="relative shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                                    <motion.span
                                        animate={{ y: [0, -2, 0] }}
                                        transition={{
                                            duration: 3.4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.3,
                                        }}
                                    >
                                        <UsersRound className="h-6 w-6 text-amber-500" strokeWidth={2.2} />
                                    </motion.span>
                                    <HeartPulse
                                        className="absolute -right-1 -bottom-1 h-3.5 w-3.5 text-amber-500"
                                        strokeWidth={2.2}
                                    />
                                </span>
                                <div>
                                    <h3 className="text-gray-900 font-semibold text-lg">Community Integration</h3>
                                    <p className="mt-2 text-gray-600 leading-7">
                                        From employment coaching to meaningful day programs, we help individuals build
                                        skills, confidence, and lasting connections.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
                {/* end overlay */}
            </motion.div>
        </motion.section>
    );
}

AboutCare.propTypes = {
    image: PropTypes.string,
    className: PropTypes.string,
};
