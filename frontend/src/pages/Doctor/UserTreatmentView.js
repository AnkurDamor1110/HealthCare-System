import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout';

const UserTreatmentView = () => {
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMeetingDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/doctor/get-treatment-meeting-details', {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    },
                });
                if (response.data.success) {
                    setMeetingDetails(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Failed to fetch treatment meeting details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMeetingDetails();
    }, []);

    return (
        <Layout>
            <div>
                <Spin spinning={loading}>
                    {meetingDetails ? (
                        <>
                            <Card title="Treatment Meeting Details">
                                <p><strong>Doctor:</strong> Dr. {meetingDetails.doctorInfo.firstName} {meetingDetails.doctorInfo.lastName}</p>
                                <p><strong>Google Meet Link:</strong>
                                    <a href={meetingDetails.googleMeetLink} target="_blank" rel="noopener noreferrer">
                                        Click here to join meeting
                                    </a>
                                </p>
                                <p><strong>Message:</strong> {meetingDetails.message}</p>
                            </Card>
                        </>
                    ) : (
                        <p>No treatment meeting details found.</p>
                    )}
                </Spin>
            </div>
        </Layout>
    );
};

export default UserTreatmentView;
