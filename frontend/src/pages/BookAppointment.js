import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';
import moment from 'moment';

function BookAppointment() {

    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    const getDoctorData = async () => {

        try {
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/get-doctor-info-by-id',
                {
                    doctorId: params.doctorId,
                },
                {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    }
                });
            dispatch(hideLoading());

            if (response.data.success) {
                setDoctor(response.data.data);

            }
        } catch (error) {

            dispatch(hideLoading());

        }
    };


    const checkAvailability = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/check-booking-avilability',
                {
                    doctorId: params.doctorId,
                    date: date,
                    time: time,
                },
                {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    }
                });
            dispatch(hideLoading());

            if (response.data.success) {
                toast.success(response.data.message);
                setIsAvailable(true);
            } else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Erro booking appointment");
            dispatch(hideLoading());

        }
    }

    const bookNow = async () => {
        setIsAvailable(false);
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date: date,
                    time: time,
                },
                {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    }
                });
            dispatch(hideLoading());

            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Erro booking appointment");
            dispatch(hideLoading());

        }
    }

    useEffect(() => {

        getDoctorData();

    }, []);

    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className="page-title">
                        {doctor.firstName} {doctor.lastName}
                    </h1>
                    <hr />
                    <h1 className="normal-text"><b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}</h1>

                    <Row>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <div className="d-flex flex-column pt-2">
                                <DatePicker format='DD-MM-YYYY' onChange={(value) =>{
                                        setDate(moment(value).format("DD-MM-YYYY"))
                                        setIsAvailable(false);
                                    }
                                }  />
                                <TimePicker format='HH:mm' className='mt-3' onChange={(value) => {
                                    setIsAvailable(false);
                                    setTime((value).format("HH:mm"));
                                }} />
                                <Button className='primary-button mt-2 full-width-button' onClick={checkAvailability}>Cheack Availability</Button>

                                {isAvailable && (
                                    <Button className='primary-button mt-2 full-width-button' onClick={bookNow}>Book Now</Button>
                                )}
                            </div>
                        </Col>
                    </Row>

                </div>

            )}
        </Layout>
    )
}

export default BookAppointment
