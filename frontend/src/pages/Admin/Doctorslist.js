import React, { useEffect, useState, useCallback } from 'react';
import Layout from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table, Modal, Button, Space } from 'antd'; // Import Modal, Button, DatePicker, Space from antd
import { toast } from "react-hot-toast";
import moment from 'moment';
import InterviewForm from './InterviewForm'; // Import the InterviewForm component

function Doctorslist() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [doctors, setDoctors] = useState([]);
    const [resumeUrl, setResumeUrl] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected doctor
    const dispatch = useDispatch();

    const getDoctorData = useCallback(async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get(`${apiUrl}/api/admin/get-all-doctors`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    }, [dispatch, apiUrl]);

    useEffect(() => {
        getDoctorData();
    }, [getDoctorData]);

    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post(`${apiUrl}/api/admin/change-account-doctor-status`, {
                doctorId: record._id, userId: record.userId, status: status
            }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getDoctorData(); // Ensure getDoctorData is accessible here
            }
        } catch (error) {
            toast.error("Error changing Doctor account status");
            dispatch(hideLoading());
        }
    };

    const handleViewResume = (record) => {
        // Set the resume URL and show the modal
        setResumeUrl(record.resume);
        setIsModalVisible(true);
    };

    const handleSetInterview = (record) => {
        // Set the selected doctor for the interview
        setSelectedDoctor(record);
        // Show the modal for setting interview
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Hide the modal
        setIsModalVisible(false);
        // Reset states
        setSelectedDoctor(null);
    };

    const handleCancel = () => {
        // Hide the modal
        setIsModalVisible(false);
        // Reset states
        setSelectedDoctor(null);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => {
                return (
                    <span>{record.firstName} {record.lastName}</span>
                )
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: 'Resume',
            dataIndex: 'resume',
            render: (text, record) => {
                return (
                    <div className="d-flex">
                        <Button type="primary" onClick={() => handleViewResume(record)}>View Resume</Button>
                    </div>
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
                        {record.status === "pending" && <h1 className='anchor' onClick={() => changeDoctorStatus(record, "approved")}>Approve</h1>}
                        {record.status === "approved" && <h1 className='anchor' onClick={() => changeDoctorStatus(record, "Block")}>Block</h1>}
                    </div>
                )
            }
        },
        {
            title: "Interview",
            dataIndex: 'interview',
            render: (text, record) => {
                return (
                    <Button type="primary" onClick={() => handleSetInterview(record)}>Set Interview</Button>
                )
            }
        }
    ];

    return (
        <Layout>
            <h1 className="page-title">Doctor List</h1>
            <Table columns={columns} dataSource={doctors} />

            {/* Modal for displaying resume and setting interview */}
            <Modal
                title={selectedDoctor ? `Set Interview for ${selectedDoctor.firstName} ${selectedDoctor.lastName}` : "Doctor's Resume"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                {selectedDoctor ? (
                    <Space direction="vertical" key={selectedDoctor._id}>
                        <InterviewForm doctorId={selectedDoctor._id} />
                    </Space>
                ) : (
                    <iframe
                        title="Doctor's Resume"
                        src={resumeUrl}
                        style={{ width: '100%', height: '600px' }}
                    />
                )}
            </Modal>

        </Layout>
    );
}

export default Doctorslist;
