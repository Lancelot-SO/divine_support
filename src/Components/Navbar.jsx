/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import ApplyModal from "./ApplyModal";

// ⬇️ Adjust this path to where you saved ApplyModal.jsx

const LABELS = ["Home", "About", "Services", "Resources", "Contact"];
const navLinks = LABELS.map((l) => ({
    name: l,
    path: l === "Home" ? "/" : `/${l.toLowerCase().replace(/\s+/g, "-")}`,
}));

export default function Navbar() {
    const [open, setOpen] = useState(false);          // mobile drawer
    const [scrolled, setScrolled] = useState(false);  // header shadow state
    const [applyOpen, setApplyOpen] = useState(false); // apply modal

    // Scroll state for header animation
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close on ESC + lock body scroll when drawer OR modal is open
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = open || applyOpen ? "hidden" : "";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, applyOpen]);

    const openApply = () => setApplyOpen(true);
    const openApplyFromDrawer = () => {
        // Close drawer then open modal after the slide-out animation
        setOpen(false);
        setTimeout(() => setApplyOpen(true), 300);
    };

    return (
        <header className="sticky top-0 z-50 w-full px-4 py-4">
            <motion.nav
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={[
                    "mx-auto max-w-7xl rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-white/70",
                    "ring-1 bg-white/90 shadow-sm transition-all",
                    scrolled ? "ring-black/10 shadow-md" : "ring-black/5",
                ].join(" ")}
                aria-label="Primary"
            >
                <div className="flex items-center justify-between px-4 py-3 md:px-6">
                    {/* Left: logo */}
                    <NavLink to="/" className="flex items-center gap-3 shrink-0" aria-label="Divine Support Services Inc.">
                        <img src={logo} alt="logo" className="h-20 w-20" />
                        <div className="leading-tight md:hidden lg:block">
                            <div className="font-serif md:text-[32px] text-sm tracking-wide text-gray-900 font-extrabold mb-1">DIVINE</div>
                            <div className="text-[16px] tracking-widest text-gray-900">SUPPORT SERVICES INC.</div>
                            <div className="md:text-[32px] font-bold text-sm tracking-widest text-gray-900">MARYLAND</div>
                        </div>
                    </NavLink>

                    {/* Center: links (desktop) */}
                    <ul className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    end={link.path === "/"}
                                    className={({ isActive }) =>
                                        `text-[15px] font-medium transition-colors ${isActive ? "text-amber-500" : "text-gray-900 hover:text-black"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Right: Apply (desktop) -> opens modal */}
                    <div className="hidden md:flex">
                        <button
                            type="button"
                            onClick={openApply}
                            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-white text-sm font-semibold shadow-sm hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition"
                        >
                            Apply <span aria-hidden>↗</span>
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        aria-label="Open menu"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </motion.nav>

            {/* MOBILE DRAWER */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 z-[60] bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    >
                        <motion.aside
                            role="dialog"
                            aria-modal="true"
                            className="absolute right-0 top-0 h-full w-[70%] max-w-sm border-l border-white/30 bg-white/20 backdrop-blur-xl shadow-2xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-4 py-4">
                                <span className="font-semibold text-gray-800 opacity-0">Menu</span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg p-2 hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6 text-gray-800" />
                                </button>
                            </div>

                            <motion.ul
                                className="px-2 py-2"
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                                    show: { transition: { staggerChildren: 0.06 } },
                                }}
                            >
                                {navLinks.map((link) => (
                                    <motion.li key={link.name} variants={{ hidden: { x: 12, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                                        <NavLink
                                            to={link.path}
                                            end={link.path === "/"}
                                            onClick={() => setOpen(false)}
                                            className={({ isActive }) =>
                                                `block rounded-xl px-4 py-3 text-[16px] font-semibold transition ${isActive ? "text-amber-600 bg-white/40" : "text-gray-900 hover:bg-white/30"
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <div className="px-4 pt-2">
                                {/* Apply (mobile) -> opens modal */}
                                <button
                                    type="button"
                                    onClick={openApplyFromDrawer}
                                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-white text-sm font-semibold shadow-sm hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                >
                                    Apply <span aria-hidden>↗</span>
                                </button>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Apply Modal (global) */}
            <ApplyModal
                open={applyOpen}
                onClose={() => setApplyOpen(false)}
                roles={["Delegating Nurse", "House Manager", "CMT", "DSP"]}
                onSubmit={(data) => {
                    console.log("Application:", data);
                    setApplyOpen(false);
                }}
            />
        </header>
    );
}
