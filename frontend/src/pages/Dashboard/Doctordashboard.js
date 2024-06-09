import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import Layout from '../../components/Layout';

function Doctordashboard() {

    const [appointments, setAppointments] = useState([]);
    const [sucessAppointments, setsucessAppointments] = useState([]);
    const [pendingAppointments, setpendingAppointments] = useState([]);
    const [approvedAppointments, setapprovedAppointments] = useState([]);
    const [rejectedAppointments, setrejectedAppointments] = useState([]);
    const [doctorUsers, setdoctorUsers] = useState([]);
    const dispatch = useDispatch();

    const getAppointments= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/doctor/get-appointments-by-doctor-id', {
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
            const response = await axios.get('/api/doctor/get-success-appointments-by-doctor-id', {
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
            const response = await axios.get('/api/doctor/get-padding-appointments-by-doctor-id', {
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
            const response = await axios.get('/api/doctor/get-approved-appointments-by-doctor-id', {
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
            const response = await axios.get('/api/doctor/get-rejected-appointments-by-doctor-id', {
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
    const getDoctorUser= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/doctor/get-users-appointments-by-doctor-id', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setdoctorUsers(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(()=>{
        getAppointments();
        getSuccessAppointments();
        getPendingAppointments();
        getApprovedAppointments();
        getRejectedAppointments();
        getDoctorUser();
    },[]);

  return (
    <Layout>
        <h1>Doctor Dashboard</h1>
        <h2>Total Appointments: {appointments.length}</h2>
        <h2>Total Success Appointments: {sucessAppointments.length}</h2>
        <h2>Total Padding Appointments: {pendingAppointments.length}</h2>
        <h2>Total Approve Appointments: {approvedAppointments.length}</h2>
        <h2>Total Rejected Appointments: {rejectedAppointments.length}</h2>
        <h2>Total Doctor's users: {doctorUsers.length}</h2>
        </Layout>
  )
}

export default Doctordashboard
