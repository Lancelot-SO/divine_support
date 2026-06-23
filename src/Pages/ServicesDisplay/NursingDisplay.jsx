/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainNursing from '../../Components/servicescomponent/servicesdetails/MainNursing'
import SEO from '../../Components/SEO'

const NursingDisplay = () => {
    return (
        <div>
            <SEO 
                title="Nursing Support | Professional Health Consultation" 
                description="Professional nursing support and health consultation services for individuals with developmental disabilities. Registered Nurses managing healthcare needs."
                keywords={["nursing support services dda", "nurse consultation maryland", "dda nursing services", "healthcare support laurel md"]}
                path="/nursing-support"
            />
            <MainNursing title="Nursing Support" image={heroImg} />
        </div>
    )
}

export default NursingDisplay