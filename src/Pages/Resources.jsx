/* eslint-disable no-unused-vars */
import React from 'react'
import GalleryHero from '../Components/gallery/GalleryHero'
import heroImg from "../assets/home/hero1.png"
import PhotoGallery from '../Components/gallery/PhotoGallery'

const Resources = () => {
    return (
        <div>
            <GalleryHero title="Gallery" image={heroImg} />
            <PhotoGallery />
        </div>
    )
}

export default Resources