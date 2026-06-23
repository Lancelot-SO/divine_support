/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainSupport from '../../Components/servicescomponent/servicesdetails/MainSupport'
import SEO from '../../Components/SEO'

const SupportDisplay = () => {
    return (
        <div>
            <SEO 
                title="Supported Living | Independent Housing Support" 
                description="Promoting independence and choice through supported living arrangements. We assist with household management, budgeting, and community access."
                keywords={["supported living dda", "independent living support md", "disability housing laurel", "community living solutions"]}
                path="/supported-living"
            />
            <MainSupport title="Supported Living" image={heroImg} />
        </div>
    )
}

export default SupportDisplay