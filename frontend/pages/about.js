import React from 'react'
import Head from 'next/head'

function About() {
  return (
    <>
    <Head>
      <title>About</title>
    </Head>
    <div>
    <div className="container px-5 py-24 mx-auto">
      <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
      <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">About Us</h1>
        
        <p className="leading-relaxed text-lg ">
      Vioend is a website where you can find gaming experience,news,updates and products. <br />
      You can also play e-sports tournaments <br /> for a minor price and win big cash prices.
        </p>
        <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-8 mb-6"></span>
        
        <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">FARDEEN AWAIS</h2>
        <p className="text-gray-700">Founder</p>
        
        <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">Madikh Hassan</h2>
        <p className="text-gray-700">CEO</p>
        
      </div>
    </div>
  </div>
  </>
  )
}

export default About