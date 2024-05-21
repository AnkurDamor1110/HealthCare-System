import React from 'react'
import { Button, Form, Input } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/login', values);
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate("/user-dashboard");
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    };

  return (

    <>
        <Header />
      <div className='authentication hero__section'>
        <div className='authentication-form card p-3'>
            <h3 className='text-headingcolor text-[22px] leading-9 font-bold mb-10'>Hello! <span className='text-primarycolor'>Welcome</span> Back 🎉</h3>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label="Email" name="email" >
                <Input placeholder='Email' />
                </Form.Item>

                <Form.Item label="Password" name="password" >
                <Input placeholder='Password' type='password'/>
                </Form.Item>

                <Form.Item >
                <Button className="primary-button my-2" type="primary" htmlType="submit">
                    Login
                </Button>
                </Form.Item>
               
                <p className='mt-3 text-textcolor text-center'>
                Don&apos;t have an account?{" "} <Link to="/register" className='text-primarycolor font-bold ml-1'>Register</Link>
                </p>
                    
                
            </Form>
        </div>
    </div>

    <Footer />
    </>
  )
}

export default Login
