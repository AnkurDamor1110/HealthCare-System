import React from 'react'
import Layout from '../components/Layout'
import { Button, Col, Form, Input, Row, TimePicker  } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import DoctorForm from '../components/DoctorForm';
import moment from 'moment';
function ApplyDoctor() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector( (state) => state.user);

    const onFinish = async (values) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/apply-doctor-account',
             {
                ...values, 
                userId: user._id,
                timings: [
                    values.timings[0].format("HH:mm"),
                    values.timings[1].format("HH:mm")
                ],
            },
             {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                navigate("/");
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
}

  return (
    <Layout>
        <h1 className='page-title'>Apply Doctor</h1>

        <DoctorForm onFinish={onFinish}/>
    </Layout>
  )
}

export default ApplyDoctor
