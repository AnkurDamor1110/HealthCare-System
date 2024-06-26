import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import Layout from "../../components/Layout";

function Userdashboard() {

  const [userDoctor, setuserDoctor] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [sucessAppointments, setsucessAppointments] = useState([]);
  const [pendingAppointments, setpendingAppointments] = useState([]);
  const [approvedAppointments, setapprovedAppointments] = useState([]);
  const [rejectedAppointments, setrejectedAppointments] = useState([]);
  const [prescriptions, setprescriptions] = useState([]);
  const dispatch = useDispatch();


  const getUserdoctors = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-user-doctors-by-user-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setuserDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const getSuccessAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-success-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setsucessAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getPendingAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-padding-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setpendingAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getApprovedAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-approved-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setapprovedAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getRejectedAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-rejected-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setrejectedAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getPrescriptions = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/get-prescriptions-by-user-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setprescriptions(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPrescriptions();
    getAppointments();
    getApprovedAppointments();
    getRejectedAppointments();
    getPendingAppointments();
    getSuccessAppointments();
    getUserdoctors();
  }, []);

  return (
    <Layout>
        <h1>User's Doctor : {userDoctor.length}</h1>
        <h1>Appointments: {appointments.length}</h1>
        <h1>Success Appointments : {sucessAppointments.length}</h1>
        <h1>Approved Appointments: {approvedAppointments.length}</h1>
        <h1>Rejected Appointments: {rejectedAppointments.length}</h1>
        <h1>Pending Appointments: {pendingAppointments.length}</h1>
        <h1>Prescriptions Appointments: {prescriptions.length}</h1>

    </Layout>
  )
}

export default Userdashboard
