/* eslint-disable no-unused-vars */
import React from 'react'
import ServicesHero from '../Components/servicescomponent/ServicesHero'
import heroImg from "../assets/home/hero1.png"
import ServicesSolution from '../Components/servicescomponent/ServicesSolution'
import AboutVission from '../Components/aboutcomponent/AboutVision'
import vission from "../assets/about/vissionImg.png"
import ServicesAssessment from '../Components/servicescomponent/ServicesAssessment'
import SEO from '../Components/SEO'


const Services = () => {
    return (
        <div>
            <SEO 
                title="Our Services | Person-Centered Disability Support" 
                description="Explore our range of DDA-approved support services in Maryland, including Residential Support, Nursing, Respite Care, Supported Employment, and transportation."
                keywords={["disability services maryland", "dda providers md", "supported living services", "respite care md", "nursing support maryland"]}
                path="/services"
            />
            <ServicesHero title="Complete Person Centered Services" image={heroImg} />
            <ServicesSolution />
            <ServicesAssessment />
            <AboutVission imageSrc={vission} />
        </div>
    )
}

export default Services