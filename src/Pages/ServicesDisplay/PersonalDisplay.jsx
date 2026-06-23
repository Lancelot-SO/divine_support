/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainPersonal from '../../Components/servicescomponent/servicesdetails/MainPersonal'
import SEO from '../../Components/SEO'

const PersonalDisplay = () => {
    return (
        <div>
            <SEO 
                title="Personal Support | Individualized In-Home Care" 
                description="We offer individualized personal support services in Maryland to assist with daily living, community integration, and independence at home."
                keywords={["personal support services dda", "in home care maryland", "individual support services md", "disability assistance laurel md"]}
                path="/personal-support"
            />
            <MainPersonal title="Personal Support" image={heroImg} />
        </div>
    )
}

export default PersonalDisplay