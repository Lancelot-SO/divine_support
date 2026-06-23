/* eslint-disable no-unused-vars */
import React from 'react'
import GalleryHero from '../Components/gallery/GalleryHero'
import heroImg from "../assets/home/hero1.png"
import PhotoGallery from '../Components/gallery/PhotoGallery'
import SEO from '../Components/SEO'

const Resources = () => {
    return (
        <div>
            <SEO 
                title="Resources & Gallery | Community Involvement" 
                description="View our photo gallery and community resources to see Divine Support Services in action, helping individuals thrive in community settings."
                keywords={["divine support services gallery", "disability care photos maryland", "dda community resources"]}
                path="/resources"
            />
            <GalleryHero title="Gallery" image={heroImg} />
            <PhotoGallery />
        </div>
    )
}

export default Resources