/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";


function buildEmbedUrl(query, zoom = 14, mapType = "m") {
    const q = encodeURIComponent(query);
    // m = map, k = satellite, h = hybrid, p = terrain
    return `https://www.google.com/maps?q=${q}&t=${mapType}&z=${zoom}&output=embed`;
}

function buildOpenUrl(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function Map({ query, zoom, mapType, height, rounded, className }) {
    const src = buildEmbedUrl(query, zoom, mapType);
    const openUrl = buildOpenUrl(query);

    return (
        <section className={className || ""}>
            <div className={`relative w-full shadow-md border border-gray-200 mt-10 ${rounded ? "rounded-2xl overflow-hidden" : ""}`}>
                {/* Map iframe */}
                <iframe
                    title={`Map of ${query}`}
                    src={src}
                    width="100%"
                    height={height}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ display: "block", border: 0 }}
                />
                {/* Fallback / Open externally */}
                <div className="absolute bottom-3 right-3">
                    <a
                        href={openUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow"
                    >
                        Open in Google Maps
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 10h10" strokeLinecap="round" />
                            <path d="M10 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

Map.propTypes = {
    /** Address or place name (free text) */
    query: PropTypes.string,
    /** Zoom level: 1 (world) – 20 (street) */
    zoom: PropTypes.number,
    /** Map type: 'm' (map), 'k' (satellite), 'h' (hybrid), 'p' (terrain) */
    mapType: PropTypes.oneOf(["m", "k", "h", "p"]),
    /** Pixel height of the iframe */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Rounded card styling */
    rounded: PropTypes.bool,
    /** Extra wrapper classes */
    className: PropTypes.string,
};

Map.defaultProps = {
    query: "3502 W. Rogers Avenue, Suite 8, Baltimore, MD 21215",
    zoom: 14,
    mapType: "m",
    height: 420,
    rounded: true,
    className: "w-full max-w-6xl mx-auto",
};
