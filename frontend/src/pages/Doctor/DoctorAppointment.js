import React, { useCallback, useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Button, Table, Modal, Space } from 'antd';
import { toast } from "react-hot-toast";
import moment from "moment";
import TreatmentMeetingForm from './TreatmentMeetingForm'; // Import the TreatmentMeetingForm component

function DoctorsAppointment() {

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointmentData = useCallback(async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/doctor/get-appointments-by-doctor-id', {
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
    }, [dispatch]);

    const changeAppointmentStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/change-appointment-status', {
                appointmentId: record._id, status: status
            }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getAppointmentData();
            }
        } catch (error) {
            toast.error("Error changing appointment status");
            dispatch(hideLoading());
        }
    };

    const handleSetTreatmentMeeting = (record) => {
        setSelectedAppointment(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedAppointment(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedAppointment(null);
    };

    const columns = [
        // {
        //     title: 'Id',
        //     dataIndex: '_id',
        // },
        {
            title: 'Patient',
            dataIndex: 'name',
            render: (text, record) => {
                return (
                    <span>{record.userInfo.name}</span>
                )
            }
        },
        // {
        //     title: 'Phone',
        //     dataIndex: 'phoneNumber',
        //     render: (text, record) => {
        //         return (
        //             <span>{record.userInfo.phoneNumber}</span>
        //         )
        //     }
        // },
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
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                return (
                    <div className="d-flex">
                        {record.status === "pending" && (
                            <div className="d-flex">
                                <h1 className='anchor px-2 '
                                    onClick={() => changeAppointmentStatus(record, "approved")}>Approve</h1>

                                <h1 className='anchor'
                                    onClick={() => changeAppointmentStatus(record, "rejected")}>Reject</h1>
                            </div>
                        )}

                        {(record.status === "approved" || record.status === "rejected" || record.status === "completed") && (
                            <div className="d-flex">
                                <h1 className=' px-2 '
                                >completed</h1>
                            </div>
                        )}

                    </div>
                )
            }
        },
        {
            title: "Set Treatment Meeting",
            dataIndex: 'Set Treatment Meeting',
            render: (text, record) => {
                return (
                    <div>
                        {record.status !== "completed" && record.status !== "rejected" && (
                            <Button type="primary" onClick={() => handleSetTreatmentMeeting(record)}>Set Treatment Meeting</Button>
                        )}
                    </div>

                )
            }
        }
    ];

    useEffect(() => {
        getAppointmentData();
    }, [getAppointmentData]);

    return (
        <Layout>
            <h1 className="page-title">Appointments </h1>
            <Table columns={columns} dataSource={appointments} />
            <Modal
                title={selectedAppointment ? `Set Treatment Meeting for ${selectedAppointment.userInfo.name}` : "Set Treatment Meeting"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedAppointment && (
                    <Space direction="vertical">
                        <TreatmentMeetingForm doctorId={selectedAppointment.doctorId} userId={selectedAppointment.userId} appointmentId={selectedAppointment._id} />
                    </Space>
                )}
            </Modal>
        </Layout>
    );
}

export default DoctorsAppointment;
