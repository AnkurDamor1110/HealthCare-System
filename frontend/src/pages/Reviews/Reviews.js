import React, { useEffect, useState } from 'react';
import { Card, Col, Rate, Row, Spin } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import './DoctorReviews.css'; 

const DoctorReviews = ({ doctorId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedComment, setExpandedComment] = useState({});

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/user/get-reviews-by-doctor-id', {
                params: { doctorId },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            if (response.data.success) {
               
                setReviews(response.data.review || []);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Failed to fetch reviews');
        }
    };

    const toggleComment = (reviewid) =>{
        setExpandedComment(prev => ({
            ...prev,
            [reviewid]: !prev[reviewid]
        }));
    }

    useEffect(() => {
        if (doctorId) {
            fetchReviews();
        }
        // eslint-disable-next-line 
    }, [doctorId]);
    return (
        <div className="doctor-reviews-container">
            <div className='flex justify-center'>
                <div className="bg-white shadow-md rounded-md my-2 w-7/12 flex justify-center items-center">
                    <h1 className="text-2xl font-semibold p-2">Doctor Reviews</h1>
                </div>
            </div>
            <Spin spinning={loading}>
                <div className='flex justify-center'>
                    <Row className='w-9/12 flex justify-center' gutter={[16, 16]}>
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <Col key={review._id} xs={24} sm={24} md={24} lg={24}>
                                    <Card className="review-card ">
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
                                        
                                        
                                        {expandedComment[review._id]?<p className="review-text"><strong>Comment:</strong> {review.comment}</p>:<p className="review-text"><strong>Comment:</strong> {review.comment.slice(0,100)}{(review.comment.length>=100)?"...":""}</p>}
                                        
                                        <div className='flex justify-end'>
                                        {(review.comment.length>=100)?<button className='font-bold bg-blue-500 px-1 py-0.5 rounded-md text-white hover:bg-blue-600 active:bg-blue-500' onClick={()=> toggleComment(review._id)}>{expandedComment[review._id]?"Show Less":"Show More"}</button>:""}
                                            
                                        </div>
                                        <p className="review-date"><strong>Date:</strong> {moment(review.createdAt).format("DD-MM-YYYY")}</p>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div className=' flex justify-center w-1/3 mt-2'>
                                <p className='p-2 text-gray-500 font-semibold flex justify-center text-lg'>No reviews found</p>
                            </div>
                        )}
                    </Row>
                </div>
                
            </Spin>
        </div>
    );
};

export default DoctorReviews;