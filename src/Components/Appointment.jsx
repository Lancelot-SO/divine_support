/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function Appointment({ open, onClose }) {
    const panelRef = useRef(null);

    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Focus the panel when opened
    useEffect(() => {
        if (open && panelRef.current) panelRef.current.focus();
    }, [open]);

    // Prevent body scroll when open
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = original);
    }, [open]);

    return (
        <div
            aria-hidden={!open}
            className={[
                "fixed inset-0 z-[100]",
                open ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={[
                    "absolute inset-0 bg-black/50 transition-opacity duration-300",
                    open ? "opacity-100" : "opacity-0",
                ].join(" ")}
            />

            {/* Panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Make an appointment"
                tabIndex={-1}
                ref={panelRef}
                className={[
                    "absolute inset-y-0 right-0 outline-none",
                    // width: full on small, ~60% on md+
                    "w-full md:w-[60vw] lg:w-[55vw] xl:w-[50vw]",
                    "bg-white shadow-2xl ring-1 ring-black/5",
                    "transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                    open ? "translate-x-0" : "translate-x-full",
                    "flex flex-col",
                ].join(" ")}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Make an Appointment</h3>
                    <button
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        aria-label="Close appointment form"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Tell us a bit about your needs and preferred time. We’ll get back to you shortly.
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // TODO: connect to your backend or email handler
                            alert("Appointment submitted ✅");
                            onClose?.();
                        }}
                        className="grid grid-cols-1 gap-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    placeholder="Jane Doe"
                                    name="fullname"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    placeholder="jane@example.com"
                                    name="email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    placeholder="+233 20 000 0000"
                                    name="phone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                                <input
                                    type="date"
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    name="date"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Service</label>
                            <select
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                                name="service"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Select a service
                                </option>
                                <option>Residential Services</option>
                                <option>Personal Support</option>
                                <option>Community Development</option>
                                <option>Nursing Services</option>
                                <option>Employment Services</option>
                                <option>Day Habilitation</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                rows={4}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                placeholder="Tell us a bit more about your needs..."
                                name="message"
                            />
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                            >
                                Submit Request
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-gray-200 text-xs text-gray-500">
                    We respect your privacy. Your information is secure and will not be shared.
                </div>
            </div>
        </div>
    );
}

Appointment.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
