/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ContactHero from "../Components/Contactcomponent/ContactHero";
import heroImg from "../assets/home/hero1.png";
import ContactBody from "../Components/Contactcomponent/ContactBody";
import Map from "../Components/Contactcomponent/Map";

export default function Contact() {
    return (
        <div>
            <ContactHero title="Contact Us" image={heroImg} />
            <ContactBody />
            <Map
                query="14201 Laurel Park Drive, Suite 206, Laurel, MD 20707"
                zoom={15} />
        </div>
    );
}
