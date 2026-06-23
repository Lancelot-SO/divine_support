/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainRespite from '../../Components/servicescomponent/servicesdetails/MainRespite'
import SEO from '../../Components/SEO'

const RespiteDisplay = () => {
    return (
        <div>
            <SEO 
                title="Respite Care | Supporting Families & Caregivers" 
                description="We provide temporary relief for primary caregivers. Safe, professional in-home and community-based respite options in Maryland."
                keywords={["respite care services dda", "caregiver relief maryland", "temporary disability care laurel md"]}
                path="/respite-care"
            />
            <MainRespite title="Respite Care" image={heroImg} />
        </div>
    )
}

export default RespiteDisplay