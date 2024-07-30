import React from 'react'
import Header from './Header'
import Footer from './Footer'
import About from '../pages/About'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import featureImg from '../assets/images/feature-img.png'
import faqImg from '../assets/images/faq-img.png'
import videoIcon from '../assets/images/video-icon.png'
import avatarIcon from '../assets/images/avatar-icon.png'
import { Link } from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import ServiceList from './Services/ServiceList'
import DoctorList from './DoctorList/DoctorList'
import FaqList from './Faq/FaqList'
import Testimonial from './Testimonial'

const HomePage = () => {
  return (
    <>
     <Header />
     <main>

      {/* ============= hero section ========= */}
      <section className='hero__section pt-[60px] 2xl:h-[800px]'>
        <div className='containerforhome'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
              {/* ======== hero content ========= */}
              <div>
                <div className='lg:w-[570px]'>
                  <h1 className='text-[36px] leading-[46px] text-headingcolor font-[800] md:text-[60px] md:leading-[70px]'>
                    We help patients live a healthy, longer life.
                  </h1>
                  <p className='text__para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue lacus risus, tempor placerat odio blandit a. Nulla facilisi. Quisque sed tempus nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

                  <Link to="/login">
                      <button className="btn">
                        Request an Appointment
                      </button>
                  </Link>
                </div>

                {/*========= hero conter ======== */}
                <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                  <div>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingcolor'>
                      30+
                    </h2>
                    <span className='w-[100px] h-2 bg-yellowcolor rounded-full block mt-[-14px]'></span>
                    <p className='text__para'>Years of Experience</p>
                  </div>


                  <div>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingcolor'>
                      15+
                    </h2>
                    <span className='w-[100px] h-2 bg-purplecolor rounded-full block mt-[-14px]'></span>
                    <p className='text__para'>Clinic Location</p>
                  </div>


                  <div>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingcolor'>
                      100%
                    </h2>
                    <span className='w-[100px] h-2 bg-iriscolor rounded-full block mt-[-14px]'></span>
                    <p className='text__para'>Patient Satisfaction</p>
                  </div>

                </div>
              </div>

              {/* ========== hero content ====== */}

              <div className='flex gap-[30px] justify-end'>
                <div>
                  <img className='w-full' src={heroImg01} alt="" />
                </div>
                <div className='mt-[30px]'>
                  <img src={heroImg02} alt='' className='w-full mb-[30px]' />
                  <img src={heroImg03} alt='' className='w-full' />
                </div>
              </div>

          </div>
        </div>
      </section>

      {/* ============= hero section end========= */}

      <section className='pt-[60px]'>
        <div className='containerforhome'>
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Providing the best medical services</h2>
            <p className='text__para text-center'>
              World-class care for everyone. Our health system offers ummatched,expert health care.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>

            <div className='py-[30px] px-5'>

              <div className='flex items-center justify-center'><img src={icon01} alt='' /></div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingcolor font-[700] text-center'>Find a Doctor</h2>

                <p className='text-[16px] leading-7 text-textcolor font-[400] mt-4 text-center'>
                World-class care for everyone. Our health system offers ummatched,expert health care. From the lab to the clinic.
                </p>

                <Link to='/doctors' className='w-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center gorup hover:bg-primarycolor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>

            </div>

            <div className='py-[30px] px-5'>

              <div className='flex items-center justify-center'><img src={icon02} alt='' /></div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingcolor font-[700] text-center'>Find a Location</h2>

                <p className='text-[16px] leading-7 text-textcolor font-[400] mt-4 text-center'>
                World-class care for everyone. Our health system offers ummatched,expert health care. From the lab to the clinic.
                </p>

                <Link to='/doctors' className='w-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center gorup hover:bg-primarycolor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>

            </div>

            <div className='py-[30px] px-5'>

              <div className='flex items-center justify-center'><img src={icon03} alt='' /></div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingcolor font-[700] text-center'>Book Appointment</h2>

                <p className='text-[16px] leading-7 text-textcolor font-[400] mt-4 text-center'>
                World-class care for everyone. Our health system offers ummatched,expert health care. From the lab to the clinic.
                </p>

                <Link to='/doctors' className='w-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center gorup hover:bg-primarycolor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

     </main> 
     <About />

     {/* ========== service section ======= */}
     <section className='pt-[60px]'>
      <div className='containerforhome'>
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'>Our medical services</h2>
          <p className='text__para text-center'>World-class care for everyone. Our health System offers unmatched, expert health care.</p>
        </div>

        <ServiceList />
      </div>
     </section>
     {/* ========== service section end ======= */}

     {/* ========== feature section ======= */}
     <section className='pt-[60px]'>
      <div className='flex items-center justify-between flex-col lg:flex-row'>
      {/* ========== feature content ======= */}
        <div className='xl:w-[670px]'>
          <h2 className='heading'>
            Get virtual treatment <br /> anytime.
          </h2>

          <ul className='pl-4'>
            <li className='text__para'>
              1. Schedule the appointment directly.
            </li>
            <li className='text__para'>2. Search for your physician here, and contact their office.</li>
            <li className='text__para'>
              3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.
            </li>
          </ul>

          <Link to="/">
            <button className='btn'>Learn More</button>
          </Link>
        </div>

        {/* ========== feature img ======= */}
        <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
          <img src={featureImg} className='w-3/4'alt='' />

          <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-[6px] lg:gap-3'>
                <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingcolor font-[600]'>
                  Tue, 24
                </p>
                <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textcolor font-[400]'>
                  10:00 AM
                </p>
              </div>
              <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowcolor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                <img src={videoIcon} alt='' />
              </span>
            </div>

            <div className='w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-blue-600 font-[500] mt-2 lg:mt-4 rounded-full'>
              Consultation
            </div>

            <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
              <img src={avatarIcon} alt='' />
              <h4 className='text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingcolor'>
                Wayne Collins
              </h4>
            </div>
          </div>
        </div>
      </div>
     </section>
     {/* ========== feature section end ======= */}

     {/* ========== our great doctors ======= */}
     <section className='pt-[60px]'>
      <div className='containerforhome'>
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            Our Great doctors
          </h2>
          <p className='text__para text-center'>
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>

        <DoctorList />
      </div>
     </section>
     {/* ========== our great doctors end ======= */}
    
      {/* ========== faq section ======= */}
      <section className='pt-[60px]'>
        <div className='containerforhome'>
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 md:block'><img src={faqImg} alt='' /></div>

            <div className='w-full md:w-1/2'>
              <h2 className='heading'>
                Most questions by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ========== faq section end ======= */}

      {/* ========== testimonial ======= */}
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

      {/* ========== testimonial end ======= */}

     <Footer />
    </>
  )
}

export default HomePage
