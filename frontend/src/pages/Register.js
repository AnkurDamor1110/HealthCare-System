import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (rule, value, callback) => {
    const password = value.trim();
    const letters = /[a-zA-Z]/;
    const upperCaseLetters = /[A-Z]/;
    const numbers = /[0-9]/;
    const specialChars = /[@!#$%^&*()_+/*-]/;
    // const uniqueChars = new Set(password).size === password.length;
    
    if (password.length < 6 || password.length > 8) {
      callback('Password must be between 6 and 8 characters long');
    } else if (!letters.test(password) || !numbers.test(password)) {
      callback('Password must contain a combination of alphabets and numbers');
    } else if (!upperCaseLetters.test(password)) {
        callback('Password must contain at least one uppercase alphabet');
    }else if (!specialChars.test(password)) {
        callback('Password must contain at least one special character: @!#$%^&*()_+/*-');
    // }else if (!uniqueChars) {
    //   callback('Password must have unique characters');
    } else {
      callback();
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/register', values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
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
          <h3 className='text-headingcolor text-[22px] leading-9 font-bold mb-4'>
            Create an <span className='text-primarycolor'>account</span>
          </h3>
          <Form layout='vertical' onFinish={onFinish} requiredMark={false}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { min: 3, message: 'Name must be at least 3 characters' },
                { max: 20, message: 'Name cannot exceed 20 characters' }
              ]}
            >
              <Input placeholder='Name' />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { validator: validatePassword }
              ]}
            >
              <Input placeholder='Password' type='password' />
            </Form.Item>

            <Form.Item>
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
  );
}

export default Register;
