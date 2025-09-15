/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Breadcrumbs from "../BreadCrumb";

const ease = [0.22, 1, 0.36, 1];

const shellV = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease, when: "beforeChildren", staggerChildren: 0.08 },
    },
};

const itemV = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function ContactHero({ title = "Services", image, className = "" }) {
    return (
        <section className={`px-4 md:px-6 mx-auto max-w-8xl ${className}`}>
            <motion.div
                variants={shellV}
                initial="hidden"
                animate="show"
                className="relative h-[50vh] md:h-[520px] lg:h-[80vh] rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md"
            >
                {/* Background (Ken Burns) */}
                {image ? (
                    <motion.img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ scale: 1.06 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.8, ease }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-400" />
                )}

                {/* Dark overlay fade-in */}
                <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    transition={{ duration: 0.9, ease }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="w-full px-6 md:px-10 lg:px-12">
                        <motion.h1
                            variants={itemV}
                            className="text-white font-serif font-bold text-3xl md:text-5xl"
                        >
                            {title}
                        </motion.h1>

                        {/* Breadcrumbs (staggered in after title) */}
                        <motion.div variants={itemV}>
                            <Breadcrumbs variant="light" separator="•" container={false} className="mt-4" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

ContactHero.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    className: PropTypes.string,
};
