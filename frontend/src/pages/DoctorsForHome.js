import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DoctorCard from '../components/DoctorList/DoctorCard'
import { doctors } from '../assets/data/doctors'
import Testimonial from '../components/Testimonial'

const DoctorsForHome = () => {
  return (
    <>
        <Header />
        
        <section className='bg-[#fff9ea] pt-[60px] pb-[60px]'>
            <div className='containerforhome text-center'>
                <h2 className='heading'>Find a Doctor</h2>
                <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
                    <input 
                        type='search'
                        className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textcolor'
                        placeholder='Search Doctor'/>
                        <button className='btn mt-0 rounded-[0px] rounded-r-md'>
                            Search
                        </button>
                </div>
            </div>
        </section>
        
        <section>
            <div className='containerforhome'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]'>
      {doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
    </div>
            </div>
        </section>

        <section className='pt-[60px]'>
        <div className='containerforhome'>
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            What our patient say
          </h2>
          <p className='text__para text-center'>
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>

        <Testimonial />
        </div>
      </section>

        <Footer />

    </>
  )
}

export default DoctorsForHome
