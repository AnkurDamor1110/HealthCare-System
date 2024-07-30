import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Resetpassword() {

    const [email,setEmail] = useState("");

    const [message,setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const onFinish = async (e) => {
        // e.preventDefault();

        const response = await fetch("/api/user/sendpasswordlink",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email}),
        });

        const data = await response.json();
        console.log(data);
        if(data.status === 201){
            setEmail("");
            setMessage(true)
        }else{
            toast.error("Invalid User")
        }

    }

  return (

    <>
        <Header />
      <div className='authentication hero__section'>
        <div className='authentication-form card p-3'>
            <h3 className='text-headingcolor text-[22px] leading-9 font-bold mb-10'>Enter Your<span className='text-primarycolor'> Email</span></h3>

            {message ? <p className='text-green-600'>password reset link send Successfully in your Email</p> : ""}
            <Form layout='vertical' onFinish={onFinish} requiredMark={false}>
                <Form.Item 
                label="Email" 
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'The input is not valid E-mail!' }
                  ]} 
                >
                <Input placeholder='Email' value={email} onChange={setVal}/>
                </Form.Item>

                <Form.Item >
                <Button className="primary-button my-2" type="primary" htmlType="submit">
                    Send
                </Button>
                </Form.Item>

                <p className='mt-3 text-textcolor text-center'>
                Want to go back ?{" "} <Link to="/login" className='text-primarycolor font-bold ml-1'>Click here</Link>
                </p>
                    
                
            </Form>
        </div>
    </div>

    <Footer />
    </>
  )
}

export default Resetpassword
