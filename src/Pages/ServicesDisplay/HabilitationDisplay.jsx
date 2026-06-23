/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainHabilitation from '../../Components/servicescomponent/servicesdetails/MainHabilitation'
import SEO from '../../Components/SEO'

const HabilitationDisplay = () => {
    return (
        <div>
            <SEO 
                title="Day Habilitation | Skill Acquisition & Activities" 
                description="Our day habilitation programs provide structured training, skill acquisition, and recreational activities for developmental growth."
                keywords={["day habilitation services dda", "habilitation program md", "disability day programs laurel"]}
                path="/day-habilitation"
            />
            <MainHabilitation title="Day Habilitation" image={heroImg} />
        </div>
    )
}

export default HabilitationDisplay