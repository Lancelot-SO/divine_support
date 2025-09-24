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

export default function About() {
    return (
        <div>
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
