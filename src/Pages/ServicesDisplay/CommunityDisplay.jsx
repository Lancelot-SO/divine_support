/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainCommunity from '../../Components/servicescomponent/servicesdetails/MainCommunity'
import SEO from '../../Components/SEO'

const CommunityDisplay = () => {
    return (
        <div>
            <SEO 
                title="Community Development | Integration & Skill Building" 
                description="Promoting community integration, social skill building, and active citizenship. Join our inclusive programs in Maryland."
                keywords={["community development services dda", "community integration md", "social skills training md"]}
                path="/community-development"
            />
            <MainCommunity title="Community Development" image={heroImg} />
        </div>
    )
}

export default CommunityDisplay