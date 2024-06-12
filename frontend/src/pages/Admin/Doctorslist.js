import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table, Modal } from 'antd'; // Import Modal from antd
import { toast } from "react-hot-toast";
import moment from 'moment';
import {Button} from 'antd';

function Doctorslist() {
    const [doctors, setDoctors] = useState([]);
    const [resumeUrl, setResumeUrl] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    const dispatch = useDispatch();

    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-doctors', {
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
    };

    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/admin/change-account-doctor-status', {
                doctorId: record._id, userId: record.userId, status: status
            }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getDoctorData();
            }
        } catch (error) {
            toast.error("Error changing Doctor account status");
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    const handleViewResume = (record) => {
        // Set the resume URL and show the modal
        setResumeUrl(record.resume);
        setIsModalVisible(true);
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
    ];

    // Function to handle modal visibility
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout>
            <h1 className="page-title">Doctor List </h1>
            <Table columns={columns} dataSource={doctors} />

            {/* Modal for displaying resume */}
            <Modal
                title="Doctor's Resume"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <iframe src={resumeUrl} style={{ width: '100%', height: '600px' }} />
            </Modal>
        </Layout>
    );
}

export default Doctorslist;
