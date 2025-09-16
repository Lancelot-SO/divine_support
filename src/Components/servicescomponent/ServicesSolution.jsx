/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Local images
import img1 from "../../assets/services/services.png";
import img2 from "../../assets/services/services.png";
import img3 from "../../assets/services/services.png";
import img4 from "../../assets/services/services.png";
import img5 from "../../assets/services/services.png";
import img6 from "../../assets/services/services.png";

/* ------------------------- Reveal-on-scroll helper ------------------------- */
/** Adds Tailwind classes when the element enters the viewport */
function Reveal({
    children,
    className = "",
    once = true,
    amount = 0.2,
    from = "opacity-0 translate-y-3 blur-[6px]",
    to = "opacity-100 translate-y-0 blur-0",
    delay = 0, // ms
    duration = 700, // ms
    as: Tag = "div",
}) {
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
        <Tag
            ref={ref}
            className={[
                visible ? to : from,
                "transition-all",
                "will-change-transform will-change-opacity",
                "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                className,
            ].join(" ")}
            style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
}

/* ---------------------------- Component ---------------------------- */
export default function ServicesSolution() {
    const cards = [
        {
            title: "Residential Services",
            text:
                "We provide safe, supportive community living homes, respite care, and supported living to help individuals thrive.",
            icon: HomeIcon,
            image: img1,
            href: "/residential",
        },
        {
            title: "Personal Support",
            text:
                "From daily living assistance to transportation and one-on-one care, we ensure every individual's needs are met with dignity.",
            icon: HeartHandsIcon,
            image: img2,
            href: "/services/personal-support",
        },
        {
            title: "Nursing Support",
            text:
                "Skilled nursing, medication monitoring, and coordination of medical appointments to keep individuals healthy and safe.",
            icon: StethoscopeIcon,
            image: img3,
            href: "/services/nursing-support",
        },
        // ✅ UPDATED: accurate text + icon
        {
            title: "Supported Living",
            text:
                "Person-centered assistance so people can live in their own homes with maximum independence—skills coaching (meals, budgeting, hygiene), medication reminders, and support for community participation.",
            icon: HomeHeartIcon,
            image: img3,
            href: "/services/supported-living",
        },
        // ✅ UPDATED: accurate text + icon
        {
            title: "Respite Care",
            text:
                "Short-term planned or emergency care that gives family caregivers a break. Flexible in-home or out-of-home options with 24/7 supervision, personal care, and health monitoring.",
            icon: BedTimeIcon,
            image: img3,
            href: "/services/respite-care",
        },
        // ✅ UPDATED: accurate text + icon
        {
            title: "Transportation",
            text:
                "Door-to-door, wheelchair-accessible rides to medical appointments, employment, day programs, and community activities—operated by trained, safety-certified drivers.",
            icon: VanIcon,
            image: img3,
            href: "/services/transportation",
        },
        {
            title: "Community Development",
            text:
                "Engaging programs that build independence through recreation, education, and community integration.",
            icon: UsersIcon,
            image: img4,
            href: "/services/community-development",
        },
        {
            title: "Employment Services",
            text:
                "Job coaching, training, and support to help individuals gain confidence and succeed in the workplace.",
            icon: BriefcaseLockIcon,
            image: img5,
            href: "/services/employment-services",
        },
        {
            title: "Day Habilitation",
            text:
                "Structured day programs that promote learning, friendships, and meaningful community participation.",
            icon: SunIcon,
            image: img6,
            href: "/services/day-habilitation",
        },
    ];

    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <Reveal>
                        <p className="text-amber-500 font-semibold tracking-[0.12em] uppercase text-sm">
                            Explore Medical Department
                        </p>
                    </Reveal>
                    <Reveal delay={80}>
                        <h2 className="mt-3 text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-extrabold text-gray-900">
                            Complete Health Solutions Because
                            <br className="hidden sm:block" /> You Deserve The Best
                        </h2>
                    </Reveal>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                    {cards.map((c, i) => (
                        <Reveal key={c.title} delay={i * 90}>
                            <ServiceCard
                                image={c.image}
                                title={c.title}
                                text={c.text}
                                Icon={c.icon}
                                href={c.href}
                            />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ----------------------------- Card ----------------------------- */
function ServiceCard({ image, title, text, Icon, href }) {
    // Vanilla 3D tilt (no Framer)
    const ref = useRef(null);
    const [rx, setRx] = useState(0);
    const [ry, setRy] = useState(0);

    const handleMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width;  // 0..1
        const py = (e.clientY - rect.top) / rect.height;  // 0..1
        const max = 8; // deg
        setRy((px - 0.5) * max * 2);  // rotateY
        setRx((0.5 - py) * max * 2);  // rotateX
    };

    const resetTilt = () => {
        setRx(0);
        setRy(0);
    };

    return (
        <article
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden will-change-transform
                 transition-transform duration-300"
            style={{
                transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Image */}
            <div className="relative group">
                <a href={href || "/"} className="block" aria-label={`${title} image link`}>
                    <img
                        src={image}
                        alt="service"
                        className="h-56 w-full object-cover opacity-0 translate-y-2 blur-[2px]
                       group-[.appeared]:opacity-100 group-[.appeared]:translate-y-0 group-[.appeared]:blur-0
                       transition-all duration-700"
                        onLoad={(e) => e.currentTarget.parentElement?.parentElement?.classList.add("appeared")}
                    />
                </a>

                {/* Floating circle icon */}
                <div className="absolute left-1/2 -bottom-6 -translate-x-1/2">
                    <div
                        className="grid h-14 w-14 place-items-center rounded-full bg-white ring-1 ring-gray-200 shadow-md
                       animate-bounce"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <Icon className="h-7 w-7 text-amber-500" />
                    </div>
                </div>
            </div>

            {/* Copy */}
            <div className="px-6 pt-10 pb-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>

                <a
                    href={href || "#"}
                    className="group relative mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2
                     text-xs font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-amber-500/50
                     transition transform hover:-translate-y-0.5 active:scale-95"
                >
                    <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                    Read more
                    <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </a>
            </div>
        </article>
    );
}

ServiceCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    href: PropTypes.string,
};

/* ----------------------------- Inline Icons ----------------------------- */
function ArrowRight({ className }) {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M4 10h10" strokeLinecap="round" />
            <path d="M10 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
ArrowRight.propTypes = { className: PropTypes.string };

function HomeIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <path d="M3 11l9-7 9 7" />
            <path d="M5 10v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9" />
            <path d="M10 21v-6h4v6" />
        </svg>
    );
}
HomeIcon.propTypes = { className: PropTypes.string };

function HeartHandsIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <path d="M12 13s-3.5-2.4-3.5-4.5A2.5 2.5 0 0 1 12 6a2.5 2.5 0 0 1 3.5 2.5C15.5 10.6 12 13 12 13z" />
            <path d="M7 12.5c-1.6 0-2.5-1.5-2.5-3V8A1.5 1.5 0 0 1 6 6.5h.5C7.3 6.5 8 7.2 8 8v3.8" />
            <path d="M17 12.5c1.6 0 2.5-1.5 2.5-3V8A1.5 1.5 0 0 0 18 6.5h-.5C16.7 6.5 16 7.2 16 8v3.8" />
        </svg>
    );
}
HeartHandsIcon.propTypes = { className: PropTypes.string };

function StethoscopeIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <path d="M6 5v4a4 4 0 0 0 8 0V5" />
            <path d="M10 13v3a5 5 0 0 0 10 0v-1" />
            <circle cx="19" cy="15" r="2" />
        </svg>
    );
}
StethoscopeIcon.propTypes = { className: PropTypes.string };

function UsersIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <circle cx="8" cy="11" r="3" />
            <circle cx="17" cy="8" r="2.5" />
            <path d="M4 19a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4" />
            <path d="M14 19a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4" />
        </svg>
    );
}
UsersIcon.propTypes = { className: PropTypes.string };

function BriefcaseLockIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <rect x="3" y="7" width="18" height="11" rx="2" />
            <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
            <circle cx="12" cy="13" r="1.6" />
            <path d="M12 14.6v1.8" />
        </svg>
    );
}
BriefcaseLockIcon.propTypes = { className: PropTypes.string };

function SunIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M19 5l1.5-1.5M5 19L3.5 20.5" />
        </svg>
    );
}
SunIcon.propTypes = { className: PropTypes.string };

/* ---------- NEW, accurate icons ---------- */

// House with heart (Supported Living)
function HomeHeartIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <path d="M3 11l9-7 9 7" />
            <path d="M5 10v9a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-9" />
            {/* heart */}
            <path d="M12 16.2c-1.5-1-2.7-2.1-2.7-3.5a2 2 0 0 1 3.7-1.1A2 2 0 0 1 16.7 12.7c0 1.4-1.2 2.5-2.7 3.5" />
        </svg>
    );
}
HomeHeartIcon.propTypes = { className: PropTypes.string };

// Bed + clock (Respite Care)
function BedTimeIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            {/* bed */}
            <path d="M3 12V7h8a3 3 0 0 1 3 3v2H3z" />
            <circle cx="6.2" cy="9.2" r="1.2" />
            <path d="M3 15v2M21 15v2M3 17h18" />
            {/* clock */}
            <circle cx="17.5" cy="7.5" r="2.7" />
            <path d="M17.5 6v1.4l1 .6" />
        </svg>
    );
}
BedTimeIcon.propTypes = { className: PropTypes.string };

// Accessible van (Transportation)
function VanIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
            <rect x="3" y="9" width="14" height="6" rx="1.5" />
            <path d="M17 11h4v4h-4" />
            <path d="M6 9h7l3 2" />
            <circle cx="7.5" cy="16" r="1.6" />
            <circle cx="16.5" cy="16" r="1.6" />
        </svg>
    );
}
VanIcon.propTypes = { className: PropTypes.string };
