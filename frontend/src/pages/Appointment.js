import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import { Table, Modal, Button } from 'antd';
import { toast } from "react-hot-toast";
import moment from "moment";
import ReviewForm from "../pages/Reviews/ReviewForm";

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const getAppointmentData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/user/get-appointments-by-user-id', {
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

    const showReviewModal = (doctorId, userId) => {
        setSelectedDoctorId(doctorId);
        setSelectedUserId(userId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedDoctorId(null);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
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
        }
    ];

    useEffect(() => {
        getAppointmentData();
    }, []);

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
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <ReviewForm doctorId={selectedDoctorId} userId={selectedUserId} />
            </Modal>
        </Layout>
    )
}

export default Appointment;
