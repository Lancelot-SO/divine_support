/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../Components/Hero'
import Support from '../Components/homecomponent/Support'
import Mission from '../Components/homecomponent/Mission'
import CardServices from '../Components/homecomponent/ServiceCard'
import TrustedSupport from '../Components/homecomponent/TrustedSupport'
import SEO from '../Components/SEO'

const Home = () => {
    const homeSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Divine Support Services Inc.",
        "image": "https://divinesupportservicesinc.org/fav.png",
        "@id": "https://divinesupportservicesinc.org/#organization",
        "url": "https://divinesupportservicesinc.org",
        "telephone": "+1-856-879-4171",
        "email": "operations@divinesupportservicesinc.org",
        "description": "We provide more than staffing, we provide peace of mind. Under DDA, we provide support services for individuals with intellectual and developmental disabilities in Maryland.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "14201 Laurel Park Drive, Suite 206",
            "addressLocality": "Laurel",
            "addressRegion": "MD",
            "postalCode": "20707",
            "addressCountry": "US"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        },
        "department": [
            {
                "@type": "LocalBusiness",
                "name": "Divine Support Services Inc. - Baltimore Office",
                "telephone": "+1-410-905-7473",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "3502 W. Rogers Avenue, Suite 8",
                    "addressLocality": "Baltimore",
                    "addressRegion": "MD",
                    "postalCode": "21215",
                    "addressCountry": "US"
                }
            }
        ]
    };

    return (
        <div className=''>
            <SEO 
                title="Home | Intellectual & Developmental Disability Services" 
                description="Divine Support Services Maryland offers residential services, personal support, nursing, respite care, and habilitation for individuals with intellectual and developmental disabilities."
                keywords={["divine support services", "developmental disabilities support maryland", "dda services maryland", "supported living laurel md", "personal support baltimore md"]}
                path="/"
                schema={homeSchema}
            />
            <Hero />
            <Support />
            <Mission />
            <CardServices />
            <TrustedSupport />
        </div>
    )
}

export default Home