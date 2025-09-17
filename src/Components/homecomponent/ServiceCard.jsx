/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Home,
    HandHeart,
    Stethoscope,
    Trees,
    BriefcaseBusiness,
    Sun,
    ArrowUpRight,
    CheckCircle2,
} from "lucide-react";


// Swap to your own promo image
import promoImg from "../../assets/home/cardimg.jpg";
import Appointment from "../Appointment";

/* ------------------------- Reveal-on-scroll helper ------------------------- */
// Adds Tailwind classes when the element enters the viewport
function Reveal({ children, className = "", once = true, amount = 0.35 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (once) obs.unobserve(el);
                } else if (!once) {
                    setVisible(false);
                }
            },
            { threshold: amount }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [once, amount]);

    return (
        <div
            ref={ref}
            className={[
                // starting state
                "opacity-0 translate-y-4",
                // animated to:
                visible ? "opacity-100 translate-y-0" : "",
                // transition curve similar to your original ease
                "transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}

Reveal.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    once: PropTypes.bool,
    amount: PropTypes.number,
};

/* ---------------------------- Default Data --------------------------- */
const defaultServices = [
    {
        title: "Residential Services",
        desc:
            "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.",
        Icon: Home,
        href: "/residential",
    },
    {
        title: "Personal Support",
        desc:
            "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.",
        Icon: HandHeart,
        href: "/personal-support",
    },
    {
        title: "Community Development (CDS)",
        desc:
            "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.",
        Icon: Trees,
        href: "#",
    },
    {
        title: "Nursing Services",
        desc:
            "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.",
        Icon: Stethoscope,
        href: "/nursing-support",
    },

    {
        title: "Employment Services",
        desc:
            "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.",
        Icon: BriefcaseBusiness,
        href: "#",
    },
    {
        title: "Day Habilitation",
        desc:
            "Community living group homes, respite care, and supported living designed to promote safety, independence, and comfort.",
        Icon: Sun,
        href: "#",
    },
];

const defaultPromo = {
    image: promoImg,
    headline: (
        <>
            Looking for Support
            <br /> for Your Loved One?
        </>
    ),
    subcopy:
        "We’re here to help every step of the way with safe, reliable, and compassionate services across Maryland.",
    bullets: ["DDA Licensed Provider", "DDA Licensed Provider"],
    ctaText: "Make Appointment",
    ctaHref: "#",
};

/* ----------------------------- Components ---------------------------- */
export default function CardServices({
    services = defaultServices,
    promo = defaultPromo,
}) {
    const list = (services && services.length ? services : defaultServices).slice(0, 6);

    // ⬇️ modal state
    const [showAppointment, setShowAppointment] = useState(false);

    return (
        <section className="mx-auto w-full max-w-8xl px-4 md:px-6 my-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4EBEFF] via-[#01476F] to-[#38B6FF] text-white p-4 md:p-6 lg:p-8">
                {/* Top label */}
                <Reveal>
                    <p className="text-center text-xs font-semibold tracking-wider uppercase text-white/80">
                        Explore Our Services
                    </p>
                </Reveal>

                {/* Heading */}
                <Reveal>
                    <h2 className="mt-2 text-center font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl">
                        Providing Compassionate Care
                        <br className="hidden sm:block" />
                        Across Maryland With Personalized
                        <br className="hidden sm:block" />
                        Supports For Every Individual
                    </h2>
                </Reveal>

                {/* Cards grid */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                    {list.slice(0, 4).map((c, idx) => (
                        <Reveal key={c.title} className={`delay-[${idx * 80}ms]`}>
                            <ServiceCard {...c} />
                        </Reveal>
                    ))}

                    {list.slice(4, 6).map((c, idx) => (
                        <Reveal key={c.title} className={`delay-[${(idx + 4) * 80}ms]`}>
                            <ServiceCard {...c} />
                        </Reveal>
                    ))}

                    {/* Promo card spans 2 columns on larger screens */}
                    <Reveal className="sm:col-span-2">
                        <PromoCard {...promo} onOpen={() => setShowAppointment(true)} />
                    </Reveal>
                </div>
            </div>

            {/* Modal mounted once and toggled with state */}
            <Appointment open={showAppointment} onClose={() => setShowAppointment(false)} />
        </section>
    );
}

CardServices.propTypes = {
    services: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            Icon: PropTypes.elementType.isRequired,
            href: PropTypes.string,
        })
    ),
    promo: PropTypes.shape({
        image: PropTypes.string,
        headline: PropTypes.node,
        subcopy: PropTypes.node,
        bullets: PropTypes.arrayOf(PropTypes.node),
        ctaText: PropTypes.string,
        ctaHref: PropTypes.string,
    }),
};

function ServiceCard({ title, desc, Icon, href }) {
    return (
        <article
            className="h-full min-h-[320px] md:min-h-[360px] rounded-xl border border-white/30 bg-white/10 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(0,0,0,0.15)]
                 transition-transform duration-300 hover:-translate-y-1"
        >
            {/* FLEX-COL: Title → Icon → Description → Link */}
            <div className="flex h-full flex-col items-start">
                {/* Title */}
                <h3 className="text-lg font-semibold text-white/95">{title}</h3>

                {/* Icon */}
                <span className="my-8 inline-flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="h-[67px] w-[67px] text-amber-300" />
                </span>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-white/80 flex-1">{desc}</p>

                {/* Link */}
                <a
                    href={href || "#"}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white
                     transition-colors"
                >
                    View Details <ArrowUpRight className="h-4 w-4" />
                </a>
            </div>
        </article>
    );
}

ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired, // a React component (icon)
    href: PropTypes.string,
};

ServiceCard.defaultProps = {
    href: "#",
};

function PromoCard({ image, headline, subcopy, bullets, ctaText, ctaHref, onOpen }) {
    return (
        <article
            className="relative overflow-hidden h-full min-h-[320px] md:min-h-[360px] rounded-xl bg-black/20 ring-1 ring-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                 transition-transform duration-300 hover:-translate-y-1 sm:col-span-2"
        >
            <img
                src={image}
                alt="Support for your loved one"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

            <div className="relative z-10 flex h-full flex-col p-5 md:p-6 lg:p-7">
                <h3 className="text-xl md:text-2xl font-extrabold text-white/95">
                    {headline}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/85 max-w-[520px]">
                    {subcopy}
                </p>

                <ul className="mt-4 space-y-2 text-white/90">
                    {(bullets || []).map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-amber-300" />
                            {b}
                        </li>
                    ))}
                </ul>

                {/* CTA opens the modal */}
                <button
                    type="button"
                    onClick={onOpen}
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm
                     hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300
                     transition-colors"
                >
                    {ctaText} <ArrowUpRight className="h-4 w-4" />
                </button>

                {/* If you must keep anchor for analytics instead:
        <a
          href={ctaHref || "#"}
          onClick={(e) => { e.preventDefault(); onOpen?.(); }}
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm
                     hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition-colors"
        >
          {ctaText} <ArrowUpRight className="h-4 w-4" />
        </a> */}
            </div>
        </article>
    );
}

PromoCard.propTypes = {
    image: PropTypes.string,
    headline: PropTypes.node,
    subcopy: PropTypes.node,
    bullets: PropTypes.arrayOf(PropTypes.node),
    ctaText: PropTypes.string,
    ctaHref: PropTypes.string,
    onOpen: PropTypes.func, // NEW
};

PromoCard.defaultProps = {
    image: defaultPromo.image,
    headline: defaultPromo.headline,
    subcopy: defaultPromo.subcopy,
    bullets: defaultPromo.bullets,
    ctaText: defaultPromo.ctaText,
    ctaHref: defaultPromo.ctaHref,
};
