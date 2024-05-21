import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { services } from '../assets/data/services'
import ServiceCard from '../components/Services/ServiceCard'

const Services = () => {
  return (
    <>
    <Header />

    <section>
      <div className='containerforhome'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {services.map((item,index) => <ServiceCard item={item} index={index} key={index} />)}
    </div>
      </div>
    </section>
    
    <Footer />
    </>
  )
}

export default Services
