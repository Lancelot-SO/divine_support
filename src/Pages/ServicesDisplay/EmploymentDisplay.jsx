/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainEmployment from '../../Components/servicescomponent/servicesdetails/MainEmployment'
import SEO from '../../Components/SEO'

const EmploymentDisplay = () => {
    return (
        <div>
            <SEO 
                title="Employment Services | Supported Job Placement" 
                description="Our employment services assist individuals with developmental disabilities in finding, securing, and maintaining meaningful employment in Maryland."
                keywords={["supported employment dda", "job placement support maryland", "disability employment laurel md", "vocational training md"]}
                path="/employment-services"
            />
            <MainEmployment title="Employment Services" image={heroImg} />
        </div>
    )
}

export default EmploymentDisplay