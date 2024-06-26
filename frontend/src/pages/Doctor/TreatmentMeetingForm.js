import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const TreatmentMeetingForm = ({ doctorId, userId }) => {
    const [loading, setLoading] = useState(false);
    // const params = useParams();
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState(null);

    const getDoctorData = async () => {

        try {
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/get-doctor-info-by-id',
                {
                    doctorId: doctorId,
                },
                {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    }
                });
            dispatch(hideLoading());

            if (response.data.success) {
                setDoctor(response.data.data);
                console.log(setDoctor);
            }
        } catch (error) {

            dispatch(hideLoading());

        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/doctor/schedule-treatment-meeting', {
                doctorId,
                userId,
                doctorInfo:doctor,
                googleMeetLink: values.googleMeetLink,
                message: values.message,
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to schedule treatment meeting.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        getDoctorData();

    }, []);
        console.log(doctor);
    return (
        <Form name="treatmentMeetingForm" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item label="Google Meet Link" name="googleMeetLink" rules={[{ required: true, message: 'Please enter Google Meet link!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter a message!' }]}>
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TreatmentMeetingForm;
