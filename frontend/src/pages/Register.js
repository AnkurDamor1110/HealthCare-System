import React from 'react'
import { Button,Form, Input } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

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
                toast("Redireacting to login page");
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
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1>Nice To Meet You</h1>
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
               
                    <Link to="/login" className='anchor mt-3'>click here to login</Link>
                
            </Form>
        </div>
    </div>
  )
}

export default Register
