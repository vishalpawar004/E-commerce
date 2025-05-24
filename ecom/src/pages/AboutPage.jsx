import React from 'react'
import HeroSection from '../Components/HeroSection'
import About from '../Components/About'
import Facts from '../Components/Facts'
import Testimonial from '../Components/Testimonial'

export default function AboutPage() {
  return (
    <>
    <HeroSection title="About Us"/>
    <Facts/>
    <About />
    <Testimonial/>

    </>
  )
}
