/* eslint-disable no-unused-vars */
import React from "react";
import AboutHero from "../Components/aboutcomponent/AboutHero";
import heroImg from "../assets/home/hero1.png";
import AboutSupport from "../Components/aboutcomponent/AboutSupport";
import supportImg from "../assets/about/supportImg.png";
import AboutResidence from "../Components/aboutcomponent/AboutResidence";
import AboutCare from "../Components/aboutcomponent/AboutCare";
import teamImg from "../assets/about/aboutcare.png"

export default function About() {
    return (
        <div>
            <AboutHero title="About Us" image={heroImg} />
            <AboutSupport image={supportImg} />
            <AboutResidence />
            <AboutCare image={teamImg} />
        </div>
    );
}
