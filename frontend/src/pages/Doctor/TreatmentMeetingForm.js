import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';

const TreatmentMeetingForm = ({ doctorId, userId, appointmentId }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const getDoctorData = async () => {
            try {
                dispatch(showLoading());
                const response = await axios.post(`${apiUrl}/api/doctor/get-doctor-info-by-id`, {
                    doctorId: doctorId,
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
            }
        };
 
        getDoctorData();
    }, [dispatch, doctorId, apiUrl]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/doctor/schedule-treatment-meeting`, {
                doctorId,
                userId,
                appointmentId,
                doctorInfo: doctor,
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
