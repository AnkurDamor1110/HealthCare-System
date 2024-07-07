import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';
import moment from 'moment';
import DoctorReviews from './Reviews/Reviews';

function BookAppointment() {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const navigate = useNavigate();

    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/get-doctor-info-by-id', {
                doctorId: params.doctorId,
            }, {
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
            toast.error('Error fetching doctor data');
        }
    };

    const checkAvailability = async () => {
        if (!date || !time) {
            toast.error('Please select date and time');
            return;
        }

        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/check-booking-avilability', {
                doctorId: params.doctorId,
                date,
                time,
            }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                }
            });
            dispatch(hideLoading());

            if (response.data.success) {
                toast.success(response.data.message);
                setIsAvailable(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error checking availability');
            dispatch(hideLoading());
        }
    };

    const bookNow = async () => {
        if (!date || !time) {
            toast.error('Please select date and time');
            return;
        }

        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/book-appointment', {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctor,
                userInfo: user,
                date,
                time,
            }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                }
            });
            dispatch(hideLoading());
        } catch (error) {
            toast.error('Error booking appointment');
            dispatch(hideLoading());
        }
    };

    const bookingHandler = async () => {
        try {
            const response = await axios.post('/api/bookings/checkout-session', {
                doctorId: params.doctorId,
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                }
            });

            bookNow();
            const data = response.data;

            if (response.status !== 200) {
                throw new Error(data.message + ' Please try again');
            }

            if (data.session.url) {
                window.location.href = data.session.url;
            }
            
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    // Disable past dates
    const disablePastDates = current => {
        return current && current < moment().startOf('day');
    };

    // Disable past hours and minutes
    const disablePastTime = () => {
        // if (moment(date).isAfter(moment(), 'day')) {
            return {
                disabledHours: () => {
                    const startHour = moment(doctor.timings[0], 'HH:mm').hour();
                    const endHour = moment(doctor.timings[1], 'HH:mm').hour();
                    return [...Array(24).keys()].filter(hour => hour < startHour || hour > endHour);
                },
                disabledMinutes: (selectedHour) => {
                    if (selectedHour === moment(doctor.timings[0], 'HH:mm').hour()) {
                        return [...Array(60).keys()].slice(0, moment(doctor.timings[0], 'HH:mm').minute());
                    }
                    if (selectedHour === moment(doctor.timings[1], 'HH:mm').hour()) {
                        return [...Array(60).keys()].slice(moment(doctor.timings[1], 'HH:mm').minute());
                    }
                    return [];
                }
            };
        // }
    
        const currentHour = moment().hour();
        const currentMinute = moment().minute();
        const startHour = moment(doctor.timings[0], 'HH:mm').hour();
        const endHour = moment(doctor.timings[1], 'HH:mm').hour();
    
        return {
            disabledHours: () => {
                return [...Array(24).keys()].filter(hour => 
                    hour < currentHour || hour < startHour || hour >= endHour
                );
            },
            disabledMinutes: (selectedHour) => {
                if (selectedHour === currentHour) {
                    return [...Array(60).keys()].slice(0, currentMinute);
                }
                if (selectedHour === startHour) {
                    return [...Array(60).keys()].slice(0, moment(doctor.timings[0], 'HH:mm').minute());
                }
                if (selectedHour === endHour) {
                    return [...Array(60).keys()].slice(moment(doctor.timings[1], 'HH:mm').minute());
                }
                return [];
            }
        };
    };
    

    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className="page-title">
                        {doctor.firstName} {doctor.lastName}
                    </h1>
                    <hr />
                    
                    <Row gutter={20} className='mt-5' align='middle'>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <img src={doctor.photo} alt='Doctor Picture' width='100%' height='400px' />
                        </Col>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <h1 className="normal-text"><b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}</h1>
                            <p><b>Phone Number:</b> {doctor.phoneNumber}</p>
                            <p><b>Address:</b> {doctor.address}</p>
                            <p><b>Fee per Visit:</b> {doctor.feesPerConsultation}</p>
                            <p><b>Website:</b> {doctor.website}</p>

                            <div className="d-flex flex-column pt-2 mt-2">
                                <DatePicker 
                                    format='DD-MM-YYYY' 
                                    disabledDate={disablePastDates}
                                    onChange={(value) => {
                                        setDate(value ? value.format("DD-MM-YYYY") : null);
                                        setIsAvailable(false);
                                    }}  
                                />
                                <TimePicker 
                                    format='HH:mm' 
                                    className='mt-3' 
                                    disabledHours={disablePastTime().disabledHours}
                                    disabledMinutes={disablePastTime().disabledMinutes}
                                    onChange={(value) => {
                                        setTime(value ? value.format("HH:mm") : null);
                                        setIsAvailable(false);
                                    }} 
                                />

                                {!isAvailable && (
                                    <Button 
                                        className='primary-button mt-2 full-width-button' 
                                        onClick={checkAvailability}
                                    >
                                        Check Availability
                                    </Button>
                                )}

                                {isAvailable && (
                                    <Button 
                                        className='primary-button mt-2 full-width-button' 
                                        onClick={bookingHandler}
                                    >
                                        Book Now
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>

                    <DoctorReviews doctorId={doctor._id} />
                </div>
            )}
        </Layout>
    );
}

export default BookAppointment;
