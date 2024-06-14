import React, { useEffect, useState } from 'react';
import { Card, Col, Rate, Row, Spin } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';

const DoctorReviews = ({ doctorId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/user/get-reviews-by-doctor-id', {
                params: { doctorId }, // Pass doctorId as a query parameter
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            if (response.data.success) {
                console.log(response.data.data); // Check the response structure
                setReviews(response.data.review || []); // Ensure 'data' key exists
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Failed to fetch reviews');
        }
    };

    useEffect(() => {
        if (doctorId) {
            fetchReviews();
        }
    }, [doctorId]);
    console.log(reviews);
    return (
        <>
            <h1 className="page-title">Doctor Reviews</h1>
            
                
                <Row gutter={[16, 16]}>
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <Col key={review._id} xs={24} sm={12} md={8} lg={6}>
                                <Card title={`${review.userInfo.name} `} bordered={false}  >
                                    
                                    <Rate allowHalf defaultValue={review.rating} disabled />
                                    <p><strong>Comment:</strong> {review.comment}</p>
                                    <p><strong>Date:</strong> {moment(review.createdAt).format("DD-MM-YYYY")}</p>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No reviews found</p>
                    )}
                </Row>
            
        </>
    );
};

export default DoctorReviews;
