/* eslint-disable no-unused-vars */
import React from 'react'
import ServicesHero from '../Components/servicescomponent/ServicesHero'
import heroImg from "../assets/home/hero1.png"
import ServicesSolution from '../Components/servicescomponent/ServicesSolution'
import AboutVission from '../Components/aboutcomponent/AboutVision'
import vission from "../assets/about/vissionImg.png"
import ServicesAssessment from '../Components/servicescomponent/ServicesAssessment'


const Services = () => {
    return (
        <div>
            <ServicesHero title="Complete Person Centered Services" image={heroImg} />
            <ServicesSolution />
            <ServicesAssessment />
            <AboutVission imageSrc={vission} />
        </div>
    )
}

export default Services