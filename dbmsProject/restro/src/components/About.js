import React from 'react'
import Intro from './Intro'
import Team from './Team'

const About = () => {
  return (
    <>
    <div className="container-xxl py-5" style={{marginTop:'1.7rem'}}>
        <Intro buttonText="Book A Table" buttonLink="/Booking"></Intro>
        <Team></Team>
    </div>
  
    </>
  )
}

export default About
