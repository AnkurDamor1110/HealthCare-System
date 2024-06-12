import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker } from 'antd';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const { RangePicker } = DatePicker;

const InterviewForm = ({ doctorId }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Make API call to submit interview details
            const response = await axios.post('/api/admin/schedule-interview', {
                doctorId,
                date: values.date,
                time: values.time,
                googleMeetLink: values.googleMeetLink
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to schedule interview.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="interviewForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date!' }]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: 'Please select a time!' }]}
            >
                <TimePicker />
            </Form.Item>

            <Form.Item
                label="Google Meet Link"
                name="googleMeetLink"
                rules={[{ required: true, message: 'Please enter Google Meet link!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InterviewForm;
