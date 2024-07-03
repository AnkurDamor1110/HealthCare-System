import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import toast from 'react-hot-toast';


const defaultContactFormData = {
  email: " ",
  subject: " ",
  message: " ",
};

const Contact = () => {


  const [contact, setContact] = useState(defaultContactFormData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [id]: value,
    }));
  };
  // console.log(contact);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const response = await fetch("/api/form/contact", {
        method : 'Post',
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      }); 

      if(response.ok){
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        alert("Message send successfully");
        // toast.success(response.data.message);
      }
    } catch(error){
      alert("Message not send");
      // toast.error('Something went wrong');
      console.log(error);
    }
  };


  return (
    <>
    <Header />

    <section className='pt-[60px]'>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-8 lg:mb-16 text-center text__para'>
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        
        <form action='#' className='space-y-8' onSubmit={handleSubmit} >
          <div>
            <label htmlFor='email' className='form__label'>Your Email</label>
            <input 
              type='email'
              id='email'
              placeholder='example@gmail.com'
              className='form__input mt-1'
              onChange={handleChange}
              />
          </div>

          <div>
            <label htmlFor='subject' className='form__label'>Subject</label>
            <input 
              type='text'
              id='subject'
              placeholder='Let us know how we can help you'
              className='form__input mt-1'
              onChange={handleChange}
              />
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='message' className='form__label'>Your Message</label>
            <textarea
              rows='6'
              type='text'
              id='message'
              placeholder='Leave a comment....'
              className='form__input mt-1'
              onChange={handleChange}
              />
          </div>
          <button type='submit' className='btn rounded sm:w-fit'  >Submit</button>
        </form>
      </div>
    </section> 
    
    <Footer />
    </>
  )
}

export default Contact
