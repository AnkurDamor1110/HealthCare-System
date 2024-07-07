import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd';
import {Link, json, useNavigate, useParams} from 'react-router-dom';

function Forgetpassword() {

  const {id,token} = useParams();
  console.log({id,token});

  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  
  const history = useNavigate();

  // const userValid = async(e)=>{
  //   const res = await fetch(`/forget-password/${id}/${token}`,{
  //     method:"GET",
  //     headers:{
  //       "Content-Type":"application/json"
  //     }
  //   });

  //   const data = await res.json()
  //   console.log(data);

  //   if(data.status == 201){
  //     console.log("user valid")
  //   }else{
  //     history("*");
  //   }
  // }

  // useEffect(()=>{
  //   userValid()
  // },[])

  const setval = (e) => {
    setPassword(e.target.value)
  }

  const sendpassword = async(e)=>{
    // e.preventDefault();


    const res = await fetch(`/${id}/${token}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({password})
    });
    
    const data = await res.json()

    if(data.status == 201){
      setPassword("")
      setMessage(true)
    }else{
      TransformStream.error("! Token Expired generate new Link")
    }
  }

  return (
    <>

<div className='authentication hero__section'>
        <div className='authentication-form card p-3'>
            <h3 className='text-headingcolor text-[22px] leading-9 font-bold mb-10'>Enter Your<span className='text-primarycolor'> New Password</span></h3>

            {message ? <p className='text-green-600'>password updated successfully</p> : ""}
            <Form layout='vertical' onFinish={sendpassword} requiredMark={false}>
                <Form.Item 
                label="New Password" 
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { type: 'password', message: 'The input is not valid password!' }
                  ]} 
                >
                <Input placeholder='Enter New Password' value={password} onChange={setval}/>
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

    </>
  )
}

export default Forgetpassword
