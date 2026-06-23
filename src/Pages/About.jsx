/* eslint-disable no-unused-vars */
import React from "react";
import AboutHero from "../Components/aboutcomponent/AboutHero";
import heroImg from "../assets/about/abouthero.png";
import AboutSupport from "../Components/aboutcomponent/AboutSupport";
import supportImg from "../assets/about/supportImg.jpg";
import AboutResidence from "../Components/aboutcomponent/AboutResidence";
import AboutCare from "../Components/aboutcomponent/AboutCare";
import teamImg from "../assets/about/aboutcare.jpg"
import AboutVission from "../Components/aboutcomponent/AboutVision";
import vission from "../assets/about/vissionImg.png"
import TrustedSupport from "../Components/homecomponent/TrustedSupport";
import Team from "../Components/Team";
import SEO from "../Components/SEO";

export default function About() {
    return (
        <div>
            <SEO 
                title="About Us | Dedicated Care Specialists" 
                description="Learn about Divine Support Services. Our mission, vision, and team are dedicated to empowering individuals with developmental disabilities in Maryland."
                keywords={["about divine support services", "disability services team maryland", "care specialists laurel md"]}
                path="/about"
            />
            <AboutHero title="About Us" image={heroImg} />
            <AboutSupport image={supportImg} />
            <AboutResidence />
            <AboutCare image={teamImg} />
            <AboutVission imageSrc={vission} />
            <Team />
            <TrustedSupport />
        </div>
    );
}
