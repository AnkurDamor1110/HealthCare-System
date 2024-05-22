import React from 'react'
import { Button,Form, Input } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/register', values);
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                navigate("/login");
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
            <h3 className='text-headingcolor text-[22px] leading-9 font-bold mb-4'>Create an <span className='text-primarycolor'>account</span></h3>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label="Name" name="name" >
                <Input placeholder='Name'/>
                </Form.Item>

                <Form.Item label="Email" name="email" >
                <Input placeholder='Email' />
                </Form.Item>

                <Form.Item label="Password" name="password" >
                <Input placeholder='Password' type='password'/>
                </Form.Item>

                <Form.Item >
                <Button className="primary-button my-2" type="primary" htmlType="submit">
                    Register
                </Button>
                </Form.Item>
               
                <p className='mt-4 text-textcolor text-center'>
                    Already have an account?
                <Link to="/login" className='anchor text-primarycolor font-medium ml-1'>Login</Link>
                </p>
                
            </Form>
        </div>
    </div>

    <Footer />
    </>
  )
}

export default Register
