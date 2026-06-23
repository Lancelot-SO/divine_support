/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ContactHero from "../Components/Contactcomponent/ContactHero";
import heroImg from "../assets/home/hero1.png";
import ContactBody from "../Components/Contactcomponent/ContactBody";
import Map from "../Components/Contactcomponent/Map";
import SEO from "../Components/SEO";

export default function Contact() {
    return (
        <div>
            <SEO 
                title="Contact Us | Office Locations & Inquiry" 
                description="Get in touch with Divine Support Services. Reach our offices in Laurel and Baltimore, MD, call us, or submit an online support request."
                keywords={["contact divine support", "divine support services phone number", "laurel md office", "baltimore md office"]}
                path="/contact"
            />
            <ContactHero title="Contact Us" image={heroImg} />
            <ContactBody />
            <Map
                query="14201 Laurel Park Drive, Suite 206, Laurel, MD 20707"
                zoom={15} />
        </div>
    );
}
