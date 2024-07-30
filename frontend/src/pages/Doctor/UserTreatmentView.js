import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { toast } from 'react-hot-toast';

const UserTreatmentView = ({ doctorId, userId, appointmentId }) => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMeetingDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/doctor/get-treatment-meeting-details`, {
                    params: {
                        doctorId: doctorId,
                        userId: userId,
                        appointmentId: appointmentId
                    },
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
    }, [doctorId, userId, appointmentId]);

    return (
        <div>
            <Spin spinning={loading}>
                {meetingDetails ? (
                    <Card title="Treatment Meeting Details">
                        <p><strong>Doctor:</strong> Dr. {meetingDetails.doctorInfo.firstName} {meetingDetails.doctorInfo.lastName}</p>
                        <p><strong>Google Meet Link:</strong>
                            <a href={meetingDetails.googleMeetLink} target="_blank" rel="noopener noreferrer">
                                Click here to join meeting
                            </a>
                        </p>
                        <p><strong>Message:</strong> {meetingDetails.message}</p>
                    </Card>
                ) : (
                    <p>No treatment meeting details found.</p>
                )}
            </Spin>
        </div>
    );
};

export default UserTreatmentView;
