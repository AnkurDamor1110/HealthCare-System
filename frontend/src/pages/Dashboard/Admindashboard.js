import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import Layout from '../../components/Layout';

function Admindashboard() {

    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [sucessAppointments, setsucessAppointments] = useState([]);
    const [pendingAppointments, setpendingAppointments] = useState([]);
    const [approvedAppointments, setapprovedAppointments] = useState([]);
    const [rejectedAppointments, setrejectedAppointments] = useState([]);
    const [medicines, setmedicines] = useState([]);
    const dispatch = useDispatch();

    const getDoctorData= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-doctors', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const getUserData= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-users', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setUsers(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    const getAppointments= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-appointments', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const getSuccessAppointments= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-success-appointments', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setsucessAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const getPendingAppointments= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-pending-appointments', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setpendingAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const getApprovedAppointments= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-approved-appointments', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setapprovedAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const getRejectedAppointments= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-rejected-appointments', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setrejectedAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    
    const getMedicine= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-medicine', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setmedicines(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    

    useEffect(()=>{
        getDoctorData();
        getUserData();
        getAppointments();
        getSuccessAppointments();
        getPendingAppointments();
        getApprovedAppointments();
        getRejectedAppointments();
        getMedicine();
    },[]);

  return (
    <>
        <Layout>
        <h1>Admin Dashboard</h1>
        <h2>Total Doctors: {doctors.length}</h2>
        <h2>Total Users: {users.length}</h2>
        <h2>Total Appointments: {appointments.length}</h2>
        <h2>Total Success Appointments: {sucessAppointments.length}</h2>
        <h2>Total Padding Appointments: {pendingAppointments.length}</h2>
        <h2>Total Approve Appointments: {approvedAppointments.length}</h2>
        <h2>Total Rejected Appointments: {rejectedAppointments.length}</h2>
        <h2>Total Medicines: {medicines.length}</h2>
        </Layout>
    </>
  )
}

export default Admindashboard
