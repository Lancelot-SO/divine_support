/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../BreadCrumb";

export default function AboutHero({ title = "About Us", image, className = "" }) {
    return (
        <section className={`px-4 md:px-6 mx-auto max-w-8xl ${className}`}>
            <div className="relative h-[50vh] md:h-[520px] lg:h-[80vh] rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-md">
                {/* Background */}
                {image ? (
                    <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-400" />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="w-full px-6 md:px-10 lg:px-12">
                        <h1 className="text-white font-serif font-bold text-3xl md:text-5xl">
                            {title}
                        </h1>

                        {/* Use your global Breadcrumbs inside the hero */}
                        <Breadcrumbs variant="light" separator="•" container={false} className="mt-4" />
                    </div>
                </div>
            </div>
        </section>
    );
}

AboutHero.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    className: PropTypes.string,
};
