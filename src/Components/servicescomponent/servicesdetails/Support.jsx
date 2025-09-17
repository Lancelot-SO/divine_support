/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";


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
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1960&auto=format&fit=crop";
const leftImg =
    "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=1964&auto=format&fit=crop";
const rightImg =
    "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=1964&auto=format&fit=crop";

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

export default function Support() {
    return (
        <motion.section variants={sectionV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="w-full bg-white px-4 py-10 md:px-8 lg:px-12 4xl:px-32">
            {/* Title + Intro */}
            <div className="mx-auto max-w-5xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                    Supported Living
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-gray-600 md:text-[15px]">
                    Our Supported Living program is designed for individuals who wish to live more independently while still receiving the personalized support they need. We provide flexible assistance tailored to each person’s lifestyle, helping them thrive in their own home or community setting.
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
                <h3 className="text-xl font-bold text-gray-900">Key Aspects of Supported Living</h3>

                <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <Feature title="Independent Living Support">
                        Assistance for individuals who want to live in their own home or apartment with the right balance of freedom and support.
                    </Feature>
                    <Feature title="Flexible Care Plans">
                        Services are customized to each person’s needs from occasional help with daily tasks to more frequent support.
                    </Feature>
                    <Feature title="Skill Development">
                        Training in budgeting, cooking, shopping, and personal management skills to promote self-sufficiency.
                    </Feature>
                    <Feature title="Community Integration">
                        Encouragement and support for participation in social, educational, and recreational activities.
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
                    Promoting Independence, Safety & Choice
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600 md:text-[15px]">
                    Supported Living empowers individuals to take charge of their lives while knowing reliable support is always available. Our goal is to encourage independence, self-determination, and a fulfilling lifestyle.
                </p>
            </div>

            {/* FAQ / Accordion */}
            <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-sm">
                <FAQItem
                    q="Who can benefit from Supported Living?"
                    a="Individuals who want to live independently but still need some level of ongoing support."
                />
                <FAQItem
                    q="What kind of assistance is provided?"
                    a="Help with daily tasks, life skills, and coordination for healthcare or community services, based on individual needs."
                />
                <FAQItem
                    q="Is staff available full-time?"
                    a="Support is flexible and scheduled according to each person’s care plan — ensuring independence with safety."
                />
                <FAQItem
                    q="How is Supported Living different from group homes?"
                    a="Group homes provide round-the-clock staff and shared living environments, while Supported Living offers greater independence with tailored support."
                />
            </div>
        </motion.section>
    );
}
