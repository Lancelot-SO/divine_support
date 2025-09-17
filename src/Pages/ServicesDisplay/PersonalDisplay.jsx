/* eslint-disable no-unused-vars */
import React from 'react'
import heroImg from "../../assets/home/hero1.png"
import MainPersonal from '../../Components/servicescomponent/servicesdetails/MainPersonal'

const PersonalDisplay = () => {
    return (
        <div><MainPersonal title="Personal Support" image={heroImg} /></div>
    )
}

export default PersonalDisplay