/* eslint-disable no-unused-vars */
import React from "react";
import AboutHero from "../Components/aboutcomponent/AboutHero";
import heroImg from "../assets/home/hero1.png";
import AboutSupport from "../Components/aboutcomponent/AboutSupport";
import supportImg from "../assets/about/supportImg.png";


export default function About() {
    return (
        <div>
            <AboutHero title="About Us" image={heroImg} />
            <AboutSupport image={supportImg} />
        </div>
    );
}
