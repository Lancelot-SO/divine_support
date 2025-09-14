/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

/** Map paths -> labels (fallback title-casing for unknown segments) */
const LABEL_MAP = {
    "": "Home",
    "about": "About",
    "services": "Services",
    "resources": "Resources",
    "contacts": "Contacts",
};

function toTitleCase(slug = "") {
    return slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function Breadcrumbs({
    hideOnHome = true,
    className = "",
    variant = "dark",        // "dark" | "light"
    separator = "/",         // e.g. "/", "•", "›"
    container = true,        // wrap with page container (padding/max-w)
    homeLabel = "Home",
}) {
    const { pathname } = useLocation();

    // normalize (no trailing slash)
    const path = pathname.replace(/\/+$/, "");
    const segments = path.split("/").filter(Boolean);

    // Build items: [{label, href, isLast}]
    const items = useMemo(
        () =>
            segments.map((seg, i) => {
                const href = "/" + segments.slice(0, i + 1).join("/");
                const key = seg.toLowerCase();
                const label = LABEL_MAP[key] || toTitleCase(seg);
                return { label, href, isLast: i === segments.length - 1 };
            }),
        [segments]
    );

    // Hide when on home
    if (hideOnHome && segments.length === 0) return null;

    const linkCls =
        variant === "light"
            ? "text-white/90 hover:text-white"
            : "text-gray-600 hover:text-gray-900";
    const currentCls =
        variant === "light" ? "text-white font-medium" : "font-medium text-amber-600";
    const sepCls = variant === "light" ? "text-white/70" : "text-gray-400";

    const wrapCls = container
        ? `w-full px-4 md:px-6 mx-auto max-w-7xl mt-3 ${className}`
        : className;

    return (
        <nav aria-label="Breadcrumb" className={wrapCls}>
            <ol className="flex flex-wrap items-center gap-1 text-sm">
                {/* Home */}
                <li className="flex items-center">
                    <NavLink to="/" className={`${linkCls} transition-colors`}>
                        {homeLabel}
                    </NavLink>
                </li>

                {items.map(({ label, href, isLast }) => (
                    <li key={href} className="flex items-center">
                        {/* Separator */}
                        <span aria-hidden="true" className={`mx-2 select-none ${sepCls}`}>
                            {separator}
                        </span>

                        {isLast ? (
                            <span aria-current="page" className={`${currentCls} line-clamp-1`} title={label}>
                                {label}
                            </span>
                        ) : (
                            <NavLink to={href} className={`${linkCls} transition-colors`}>
                                {label}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

Breadcrumbs.propTypes = {
    hideOnHome: PropTypes.bool,
    className: PropTypes.string,
    variant: PropTypes.oneOf(["dark", "light"]),
    separator: PropTypes.string,
    container: PropTypes.bool,
    homeLabel: PropTypes.string,
};
