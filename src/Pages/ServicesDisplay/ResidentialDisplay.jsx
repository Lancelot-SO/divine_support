/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainResidential from '../../Components/servicescomponent/servicesdetails/MainResidential'
import SEO from '../../Components/SEO'

const ResidentialDisplay = () => {
    return (
        <div>
            <SEO 
                title="Residential Services | Community Living" 
                description="Our residential services provide safe, supportive community living arrangements in Maryland, helping individuals develop daily living skills and independence."
                keywords={["residential services dda", "community living support md", "group homes maryland", "assisted living laurel md"]}
                path="/residential"
            />
            <MainResidential title="Residential Services" image={heroImg} />
        </div>
    )
}

export default ResidentialDisplay