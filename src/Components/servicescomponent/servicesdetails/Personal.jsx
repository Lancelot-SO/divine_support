/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import S1 from "../../../assets/services/s1.jpg"
import S2 from "../../../assets/services/s2.jpg"
import S3 from "../../../assets/services/s3.jpg"


const EASE = [0.22, 1, 0.36, 1];

const sectionV = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE, when: "beforeChildren", staggerChildren: 0.08 }
    }
};

const itemV = {
    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } }
};

const imageV = {
    hidden: { opacity: 0, scale: 1.035 },
    show: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } }
};

const heroImg =
    S1;
const leftImg =
    S2;
const rightImg =
    S3;

function Feature({ title, children }) {
    return (
        <motion.div
            variants={itemV}
            whileHover={{ y: -2 }}
            className="group flex gap-3 transition-transform duration-300"
        >
            <div className="mt-1 shrink-0">
                <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-amber-400/20 ring-1 ring-amber-400/50 group-hover:bg-amber-400/25 transition">
                    <CheckCircle2 className="h-4 w-4 text-amber-600" />
                </span>
            </div>
            <div>
                <h4 className="text-[15px] font-semibold text-gray-800">{title}</h4>
                <p className="mt-1 text-sm leading-6 text-gray-600">{children}</p>
            </div>
        </motion.div>
    );
}

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-gray-200">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-gray-50"
            >
                <span className="text-[15px] font-semibold text-gray-900">{q}</span>
                <span
                    className={`grid h-6 w-6 place-items-center rounded bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/30 transition-transform ${open ? "rotate-45" : ""}`}
                >
                    <Plus className="h-4 w-4" />
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="px-4 pb-4 text-sm leading-6 text-gray-600 overflow-hidden"
                    >
                        {a}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

FAQItem.propTypes = {
    q: PropTypes.string.isRequired,
    a: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default function Personal() {
    return (
        <motion.section variants={sectionV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="w-full bg-white px-4 py-10 md:px-8 lg:px-12 4xl:px-32">
            {/* Title + Intro */}
            <div className="mx-auto max-w-5xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                    Personal Support
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-gray-600 md:text-[15px]">
                    We provide individualized one-on-one assistance to help individuals with intellectual and developmental disabilities live independently and with dignity. From daily living tasks to community participation, our dedicated staff ensures that every person receives the care and guidance they need.
                </p>
            </div>

            {/* Hero Image */}
            <div className="mx-auto mt-6 max-w-5xl">
                <motion.img
                    variants={imageV}
                    whileHover={{ scale: 1.01 }}
                    src={heroImg}
                    alt="Residential support session"
                    className="aspect-[16/7] w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5"
                    loading="lazy"
                />
            </div>

            {/* Key Aspects */}
            <div className="mx-auto mt-8 max-w-5xl">
                <h3 className="text-xl font-bold text-gray-900">Key Aspects of Personal Support</h3>

                <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <Feature title="Daily Living Assistance">
                        Help with cooking, cleaning, hygiene, shopping, and other daily activities.
                    </Feature>
                    <Feature title="Transportation Services">
                        Reliable support for medical appointments, community activities, and errands.
                    </Feature>
                    <Feature title="Social Engagement">
                        Encouraging positive social interactions to reduce isolation and build confidence.
                    </Feature>
                    <Feature title="Skill Building">
                        Support with money management, scheduling, and personal organization to foster independence.
                    </Feature>
                </div>
            </div>

            {/* Two Photos */}
            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
                <motion.img
                    variants={imageV}
                    whileHover={{ scale: 1.02 }}
                    src={leftImg}
                    alt="Counseling session"
                    className="h-80 w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5 md:h-[380px]"
                    loading="lazy"
                />
                <motion.img
                    variants={imageV}
                    whileHover={{ scale: 1.02 }}
                    src={rightImg}
                    alt="One-on-one conversation"
                    className="h-80 w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5 md:h-[380px]"
                    loading="lazy"
                />
            </div>

            {/* Subheading */}
            <div className="mx-auto mt-8 max-w-5xl">
                <h3 className="text-xl font-bold text-gray-900">
                    Personal Support is Key to Independence
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600 md:text-[15px]">
                    Our personal support services are designed to empower individuals to live their best lives. By balancing independence with safety and support, we ensure that each person can thrive in their community.
                </p>
            </div>

            {/* FAQ / Accordion */}
            <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-sm">
                <FAQItem
                    q="How do I know if personal support services are needed?"
                    a="If an individual needs daily assistance with tasks, transportation, or community involvement, personal support is the right fit."
                />
                <FAQItem
                    q="Do you provide transportation?"
                    a="Yes, we offer safe and reliable transportation to medical appointments, social activities, and errands."
                />
                <FAQItem
                    q="Can services be customized?"
                    a="Absolutely. Each support plan is tailored to the individual’s unique needs and goals."
                />
                <FAQItem
                    q="Is support available in the community?"
                    a="Yes. Our staff encourages and supports individuals in fully participating in their communities."
                />
            </div>
        </motion.section>
    );
}
