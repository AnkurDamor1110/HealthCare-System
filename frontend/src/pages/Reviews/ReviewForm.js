import React, { useState } from 'react';
import { Form, Input, Button, Rate } from 'antd';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ doctorId, userId }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Make API call to submit review
            const response = await axios.post('/api/user/submit-review', {
                doctorId,
                userId,
                userInfo:user,
                rating: values.rating,
                comment: values.comment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/approved-doctor");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to submit review.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Form
            name="reviewForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please select a rating!' }]}
            >
                <Rate />
            </Form.Item>

            <Form.Item
                label="Comment"
                name="comment"
                rules={[{ required: true, message: 'Please enter your comment!' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}; 

export default ReviewForm;
