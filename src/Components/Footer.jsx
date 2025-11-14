/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { MapPin, Headphones, ArrowUpRight } from "lucide-react";

// Swap to your actual logo path
import logo from "../assets/logo2.png";

const ease = [0.22, 1, 0.36, 1];

const containerV = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease, when: "beforeChildren", staggerChildren: 0.06 },
    },
};

const itemV = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export default function Footer() {
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setEmail("");
    };

    return (
        <footer className="mt-16">
            {/* Sky panel */}
            <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="relative overflow-hidden rounded-t-[48px] bg-[#DFF0FA] px-5 py-10 md:px-8 lg:px-12"
            >
                <div className="mx-auto w-full max-w-8xl">
                    {/* Top row: Newsletter (9) + Offices (3) */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                        <motion.div variants={itemV} className="lg:col-span-9">
                            <h3 className="text-[22px] md:text-[24px] font-semibold text-gray-800">Newsletter Subscribe</h3>
                            <p className="mt-1 text-gray-500">Subscribe our newsletter to get more updates</p>

                            <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <label className="sr-only" htmlFor="footer-email">Email Address</label>
                                <input
                                    id="footer-email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="h-14 w-full rounded-full bg-white px-6 text-gray-800 shadow-sm outline-none ring-1 ring-black/5 placeholder:text-gray-400 sm:max-w-[460px]"
                                />
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-amber-500 px-7 font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                                >
                                    Subscribe Now <ArrowUpRight className="h-4 w-4" />
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Offices column (3) — cards fill & align from same start */}
                        <div className="lg:col-span-3 flex flex-col gap-5 items-stretch">
                            <OfficeCard
                                title="Laurel Office"
                                address={["14201 Laurel Park Drive, Suite 206,", "Laurel, MD 20707"]}
                            />
                            <OfficeCard
                                title="Baltimore Office"
                                address={["3502 W. Rogers Avenue, Suite 8,", "Baltimore, MD 21215"]}
                            />
                            <OfficeCard
                                title="Office hours"
                                address={["Monday - Friday", "9:00am - 5:00pm"]}
                            />
                        </div>
                    </div>

                    {/* Middle row: Logo (3) + Community (3) + Services (3) + Support (3) */}
                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
                        {/* Logo */}
                        <motion.div variants={itemV} className="md:col-span-3">
                            <img src={logo} alt="Divine Support Services Inc." className="h-24 w-auto object-contain mb-4" />
                            <div className="leading-tight md:hidden lg:block">
                                <div className="font-serif text-[32px]  tracking-wide text-gray-900 font-extrabold mb-1">DIVINE</div>
                                <div className="text-[16px] tracking-widest text-gray-900">SUPPORT SERVICES INC.</div>
                                <div className="text-[32px] font-bold  tracking-widest text-gray-900">MARYLAND</div>
                            </div>
                        </motion.div>

                        {/* Community */}
                        <motion.div variants={itemV} className="md:col-span-3">
                            <h4 className="text-lg font-semibold text-gray-800">Community</h4>
                            <ul className="mt-4 space-y-3 text-gray-700">
                                {["About Us", "Our Mission & Values", "FAQs", "Resources & Blog", "Contacts us"].map((label) => (
                                    <FooterLink key={label} label={label} href="#" />
                                ))}
                            </ul>
                        </motion.div>

                        {/* Services */}
                        <motion.div variants={itemV} className="md:col-span-3">
                            <h4 className="text-lg font-semibold text-gray-800">Services</h4>
                            <ul className="mt-4 space-y-3 text-gray-700">
                                {[
                                    "Residential Services",
                                    "Personal & Community Support",
                                    "Nursing Support",
                                    "Community Development Programs",
                                    "Employment Services",
                                ].map((label) => (
                                    <FooterLink key={label} label={label} href="#" />
                                ))}
                            </ul>
                        </motion.div>

                        {/* Support card (3) — starts at same column as Offices above (col 10) */}
                        <motion.div variants={itemV} className="md:col-span-3">
                            <SupportCard />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom bar */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease }}
                className="bg-amber-500"
            >
                <div className="mx-auto w-full max-w-7xl px-5 py-5 text-white">
                    <ul className="flex flex-col items-center justify-center gap-3 text-sm font-medium sm:flex-row sm:gap-12">
                        <BottomLink label="Privacy policy" />
                        <BottomLink label="Terms & Conditions" />
                        <BottomLink label="© 2025 Artfrica Studios. All rights reserved." />
                    </ul>
                </div>
            </motion.div>
        </footer>
    );
}

/* -------------------------- Small subcomponents -------------------------- */

function FooterLink({ label, href }) {
    return (
        <li>
            <motion.a href={href} className="relative inline-block hover:text-gray-900" whileHover={{ y: -1 }}>
                {label}
            </motion.a>
        </li>
    );
}

function BottomLink({ label }) {
    return (
        <motion.li whileHover={{ y: -1 }}>
            <a className="hover:underline decoration-white/70 underline-offset-4" href="#">
                {label}
            </a>
        </motion.li>
    );
}

function OfficeCard({ title, address }) {
    return (
        <motion.div
            variants={itemV}
            className="h-full rounded-xl border border-white/60 bg-white/60 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
        >
            <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-black/5">
                    <MapPin className="h-5 w-5 text-gray-700" />
                </span>
                <h5 className="text-[18px] font-semibold text-gray-800">{title}</h5>
            </div>
            <p className="mt-3 text-[15px] leading-7 text-gray-600">
                {address.map((line, i) => (
                    <span key={i} className="block">
                        {line}
                    </span>
                ))}
            </p>
        </motion.div>
    );
}

function SupportCard() {
    return (
        <motion.div className="h-full rounded-xl border border-white/60 bg-white/60 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-black/5">
                    <Headphones className="h-5 w-5 text-gray-700" />
                </span>
                <h5 className="text-[18px] font-semibold text-gray-800">Support</h5>
            </div>

            <div className="mt-3 space-y-2 text-[15px] leading-7 text-gray-700">
                <div>
                    <span className="text-gray-500">Email Us :</span>{" "}
                    <a href="mailto:operations@divinesupportservicesinc.org" className="underline decoration-gray-400">
                        operations@divinesupportservicesinc.org
                    </a>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <span className="text-gray-500">Phone no :</span>
                    <span>+1 (856) 879-4171 </span>
                    <pan>+1 (410) 905-7473</pan>
                    <span>+1 (443) 248-5410</span>
                </div>
            </div>
        </motion.div>
    );
}

/* ------------------------------- PropTypes ------------------------------- */

FooterLink.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
};
FooterLink.defaultProps = {
    href: "/",
};

BottomLink.propTypes = {
    label: PropTypes.string.isRequired,
};

OfficeCard.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// SupportCard currently takes no props
SupportCard.propTypes = {};
