/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainTransport from '../../Components/servicescomponent/servicesdetails/MainTransport'
import SEO from '../../Components/SEO'

const TransportDisplay = () => {
    return (
        <div>
            <SEO 
                title="Transportation Services | Secure Travel Assistance" 
                description="We provide safe and reliable transit options for medical appointments, day programs, workplaces, and community activities."
                keywords={["disability transportation dda", "workplace transit assistance md", "medical transit support laurel md"]}
                path="/transportation"
            />
            <MainTransport title="Transportation" image={heroImg} />
        </div>
    )
}

export default TransportDisplay