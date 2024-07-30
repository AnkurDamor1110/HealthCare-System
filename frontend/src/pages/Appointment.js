import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import { Table, Modal, Button } from 'antd';
// import { toast } from "react-hot-toast";
import moment from "moment";
import ReviewForm from "../pages/Reviews/ReviewForm";
import UserTreatmentView from './Doctor/UserTreatmentView';

function Appointment() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [appointments, setAppointments] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [isTreatmentModalVisible, setIsTreatmentModalVisible] = useState(false);
    const dispatch = useDispatch();

    

    const showReviewModal = (doctorId, userId) => {
        setSelectedDoctorId(doctorId);
        setSelectedUserId(userId);
        setIsReviewModalVisible(true);
    };

    const showTreatmentModal = (doctorId, userId, appointmentId) => {
        setSelectedDoctorId(doctorId);
        setSelectedUserId(userId);
        setSelectedAppointmentId(appointmentId);
        setIsTreatmentModalVisible(true);
    };

    const handleCancel = () => {
        setIsReviewModalVisible(false);
        setIsTreatmentModalVisible(false);
        setSelectedDoctorId(null);
        setSelectedUserId(null);
        setSelectedAppointmentId(null);
    };

    const columns = [
        {
            title: 'Doctor',
            dataIndex: 'name',
            render: (text, record) => {
                return (
                    <span>{record.doctorInfo.firstName} {record.doctorInfo.lastName}</span>
                )
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            render: (text, record) => {
                return (
                    <span>{record.doctorInfo.phoneNumber}</span>
                )
            }
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return (
                    <span>{moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}</span>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Review',
            dataIndex: 'status',
            render: (text, record) => {
                if (record.status === 'completed') {
                    return (
                        <Button type="primary" onClick={() => showReviewModal(record.doctorInfo._id, record.userInfo._id)}>
                            Review
                        </Button>
                    )
                } else {
                    return null;
                }
            }
        },
        {
            title: 'Treatment Meeting',
            dataIndex: 'treatmentMeeting',
            render: (text, record) => {
                if (!record.doctorInfo || !record.userInfo || !record._id) {
                    return <h1>Invalid Data</h1>;
                }
        
                if (record.status === 'approved') {
                    return (
                        <Button 
                            type="primary" 
                            onClick={() => showTreatmentModal(record.doctorInfo._id, record.userInfo._id, record._id)}
                            aria-label="Schedule Treatment Meeting"
                        >
                            Treatment Meeting
                        </Button>
                    );
                } else if (record.status === 'pending' || record.status === 'rejected') {
                    return <h1>Not revised link</h1>;
                } else {
                    return <h1>Completed</h1>;
                }
            }
        },
        
    ];

    useEffect(() => {

        const getAppointmentData = async () => {
            try {
                dispatch(showLoading());
                const response = await axios.get(`${apiUrl}/api/user/get-appointments-by-user-id`, {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    },
                });
                dispatch(hideLoading());
                if (response.data.success) {
                    setAppointments(response.data.data);
                }
            } catch (error) {
                dispatch(hideLoading());
            }
        };

        getAppointmentData();
    }, [dispatch]);

    return (
        <Layout>
            <div className='flex justify-center'>
                <div className='bg-white my-2 flex justify-center w-1/2 rounded-md shadow-md'>
                    <h1 className="page-title p-2">Appointments</h1>
                </div>
            </div>
            <div className='shadow-md mt-1'>
                <Table columns={columns} dataSource={appointments} />
            </div>
            <Modal
                title="Submit Review"
                visible={isReviewModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <ReviewForm doctorId={selectedDoctorId} userId={selectedUserId} />
            </Modal>

            <Modal
                title="Treatment Meeting"
                visible={isTreatmentModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <UserTreatmentView doctorId={selectedDoctorId} userId={selectedUserId} appointmentId={selectedAppointmentId} />
            </Modal>
        </Layout>
    )
}

export default Appointment;
