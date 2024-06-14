import React, { useEffect, useState } from 'react';
import { Card, Col, Rate, Row, Spin } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import './DoctorReviews.css'; 

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
    return (
        <div className="doctor-reviews-container">
            <h1 className="page-title">Doctor Reviews</h1>
            <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <Col key={review._id} xs={24} sm={12} md={8} lg={6}>
                                <Card className="review-card">
                                    <div className="review-header">
                                        <img
                                            src={review.userInfo.profilePicture}
                                            alt="Profile"
                                            className="profile-picture"
                                        />
                                        <div>
                                            <h3>{review.userInfo.name}</h3>
                                            <Rate allowHalf defaultValue={review.rating} disabled />
                                        </div>
                                    </div>
                                    <p className="review-text"><strong>Comment:</strong> {review.comment}</p>
                                    <p className="review-date"><strong>Date:</strong> {moment(review.createdAt).format("DD-MM-YYYY")}</p>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No reviews found</p>
                    )}
                </Row>
            </Spin>
        </div>
    );
};

export default DoctorReviews;