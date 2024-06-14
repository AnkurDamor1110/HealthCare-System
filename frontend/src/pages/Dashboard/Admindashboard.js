import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faUsers, faCalendarCheck, faCalendarTimes, faCalendarDay, faCalendarAlt, faPills } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';
import './Admindashboard.css';

function Admindashboard() {
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [successAppointments, setSuccessAppointments] = useState([]);
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [approvedAppointments, setApprovedAppointments] = useState([]);
    const [rejectedAppointments, setRejectedAppointments] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async (url, setState) => {
        try {
            dispatch(showLoading());
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setState(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        fetchData('/api/admin/get-all-doctors', setDoctors);
        fetchData('/api/admin/get-all-users', setUsers);
        fetchData('/api/admin/get-all-appointments', setAppointments);
        fetchData('/api/admin/get-all-success-appointments', setSuccessAppointments);
        fetchData('/api/admin/get-all-pending-appointments', setPendingAppointments);
        fetchData('/api/admin/get-all-approved-appointments', setApprovedAppointments);
        fetchData('/api/admin/get-all-rejected-appointments', setRejectedAppointments);
        fetchData('/api/admin/get-all-medicines', setMedicines);
    }, []);

    const pieData = {
        labels: ['Success', 'Pending', 'Approved', 'Rejected'],
        datasets: [
            {
                label: '# of Appointments',
                data: [
                    successAppointments.length,
                    pendingAppointments.length,
                    approvedAppointments.length,
                    rejectedAppointments.length,
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Layout>
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <hr />
            </div>
            <div className="dashboard-stats">
                <div className="dashboard-group">
                    <h2 className="doctor-card">
                        <FontAwesomeIcon icon={faUserMd} className="icon" />
                        Total Doctors: <span className="number">{doctors.length}</span>
                    </h2>
                    <h2 className="user-card">
                        <FontAwesomeIcon icon={faUsers} className="icon" />
                        Total Users: <span className="number">{users.length}</span>
                    </h2>
                </div>
                <div className="dashboard-group">
                    <h2 className="appoitment">
                        <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                        Total Appointments: <span className="number">{appointments.length}</span>
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={faCalendarCheck} className="icon" />
                        <p>Total Success Appointments:</p>
                        <span className="number">{successAppointments.length}</span>
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={faCalendarDay} className="icon" />
                        Total Pending Appointments: <span className="number">{pendingAppointments.length}</span>
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                        Total Approved Appointments: <span className="number">{approvedAppointments.length}</span>
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={faCalendarTimes} className="icon" />
                        Total Rejected Appointments: <span className="number">{rejectedAppointments.length}</span>
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={faPills} className="icon" />
                        Total Medicines: <span className="number">{medicines.length}</span>
                    </h2>
                </div>
            </div>
            <div className="charts">
                <div className="pie-chart">
                    <Pie data={pieData} />
                </div>
            </div>
        </Layout>
    );
}

export default Admindashboard;
