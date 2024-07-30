import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout';
import moment from 'moment'; // Import moment library

const UserInterviewDetails = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [interviewDetails, setInterviewDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInterviewDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/user/interview-details`, {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    },
                });
                if (response.data.success) {
                    setInterviewDetails(response.data.interviewDetails);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Failed to fetch interview details.");
            } finally {
                setLoading(false);
            }
        };

        fetchInterviewDetails();
    }, [apiUrl]);

    return (
        <Layout>
            <div>
                <Spin spinning={loading}>
                    {interviewDetails ? (
                        <>
                            <Card title="Interview Details">
                                <p><strong>Date:</strong> {moment(interviewDetails.date).format("DD-MM-YYYY")}</p>
                                <p><strong>Time:</strong> {moment(interviewDetails.time).format("HH:mm")} </p>
                                <p><strong>Google Meet Link:</strong>
                                    <a href={interviewDetails.googleMeetLink} target="_blank" rel="noopener noreferrer">
                                        Click here to join meeting
                                    </a>
                                </p>
                            </Card>
                            <Card title="Instructions">
                                <p><strong>Meeting Instructions:</strong></p>
                                <ul>
                                    <li>Review patient cases or medical records relevant to the interview.</li>
                                    <li>Ensure a quiet and well-lit environment for clear communication.</li>
                                    <li>Test your camera, microphone, and speakers beforehand to avoid technical issues.</li>
                                    <li>Dress professionally and maintain eye contact with the camera during the interview.</li>
                                    <li>Arrive a few minutes early to the Google Meet room to avoid any delays.</li>
                                </ul>
                                <p>For any technical issues during the interview, please use the chat function or contact the administrator.</p>
                            </Card>
                        </>
                    ) : (
                        <p>No interview details found.</p>
                    )}
                </Spin>
            </div>
        </Layout>
    );
};

export default UserInterviewDetails;
