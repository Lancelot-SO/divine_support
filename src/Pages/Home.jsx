/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../Components/Hero'
import Support from '../Components/homecomponent/Support'
import Mission from '../Components/homecomponent/Mission'
import CardServices from '../Components/homecomponent/ServiceCard'
import TrustedSupport from '../Components/homecomponent/TrustedSupport'

const Home = () => {
    return (
        <div className=''>
            <Hero />
            <Support />
            <Mission />
            <CardServices />
            <TrustedSupport />
        </div>
    )
}

export default Home