/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

export default function AboutSupport({ image, className = "" }) {
    return (
        <section className={`px-4 md:px-6 mx-auto max-w-7xl py-10 md:py-14 ${className}`}>
            {/* Intro */}
            <p className="text-amber-500 font-semibold text-sm md:text-base">
                About Divine Support Services
            </p>

            <h2 className="mt-3 text-gray-900 font-medium tracking-tight
                     text-[28px] leading-[49px]
                     md:text-[36px] md:leading-[1.2]
                     lg:text-[36px] md:max-w-5xl">
                We focus on person-centered care, compassionate support, and empowering
                individuals with intellectual and developmental disabilities to live
                with dignity, independence, and safety
            </h2>

            <p className="mt-4 max-w-4xl text-gray-600 leading-8">
                At Divine Support Services, our mission is simple: treat every individual with the
                same respect and dignity we would want for ourselves. We provide a wide range of
                supports from residential living and personal assistance to employment coaching and
                day programs all designed to help people reach their goals and thrive in their communities.
            </p>

            {/* Content row */}
            <div className="mt-8 grid gap-4 lg:grid-cols-2 items-stretch">
                {/* Left: image */}
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/5 shadow">
                    {image ? (
                        <img
                            src={image}
                            alt="Supportive care in action"
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-[280px] md:h-[340px] lg:h-[380px] bg-gradient-to-br from-gray-200 to-gray-400" />
                    )}
                </div>

                {/* Right: orange card */}
                <div className=" bg-gradient-to-r from-[#F09C13] via-[#E28C12] to-[#A85F0A] md:w-[519px] rounded-2xl shadow-md ring-1 ring-black/5 p-6 text-white">
                    {/* Item 1 */}
                    <div className="flex items-start gap-4">
                        <span
                            className="inline-flex size-[50px] shrink-0 items-center justify-center
             rounded-full border border-white/40 font-semibold leading-none"
                        >
                            1
                        </span>

                        <div>
                            <h3 className="font-semibold text-lg">Compassionate Support</h3>
                            <p className="mt-2 text-white/90 leading-7">
                                We create safe, caring environments where individuals are encouraged to make
                                choices, build confidence, and live meaningful lives.
                            </p>
                        </div>
                    </div>

                    <hr className="my-6 border-white/30" />

                    {/* Item 2 */}
                    <div className="flex items-start gap-4">
                        <span
                            className="inline-flex size-[50px] shrink-0 items-center justify-center
             rounded-full border border-white/40 font-semibold leading-none"
                        >
                            2
                        </span>

                        <div>
                            <h3 className="font-semibold text-lg">Person-Centered Approach</h3>
                            <p className="mt-2 text-white/90 leading-7">
                                Every plan is tailored to the unique needs and dreams of the individual
                                promoting independence, growth, and self-determination.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

AboutSupport.propTypes = {
    image: PropTypes.string,
    className: PropTypes.string,
};
