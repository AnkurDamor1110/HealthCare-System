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
        "/api/user/get-pading-appointments-by-user-id",
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
      const response = await axios.get("/api/get-prescriptions-by-user-id", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
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
      <title className="flex justify-center text-2xl border-b-2 border-gray-200 font-semibold">
        User Dashboard
      </title>
      <div className="flex">
        <div className="bg-white mx-2 ml-5 my-3 p-3 rounded-lg w-1/2 flex justify-between items-center shadow-md"><i className="fa-solid fa-user-doctor fa-xl"></i><h1 className="flex justify-center font-semibold">User's Doctor: </h1><p className="font-bold text-2xl">{userDoctor.length}</p></div>
        <div className="bg-white mx-1 mr-5 my-3 p-3 rounded-lg w-1/2 flex justify-between items-center shadow-md"><i class="fa-solid fa-calendar-days fa-xl"></i><h1 className="flex justify-center font-semibold">Appointments: </h1><p className="font-bold text-2xl">{appointments.length}</p></div>
      </div>
      <div className=" flex">
      <div className="bg-white m-2 p-3 rounded-lg h-20 w-1/3 flex justify-between items-center shadow-md"><i class="fa-solid fa-square-check fa-xl"></i><h1 className="flex justify-center font-semibold">Success Appointments : </h1><p className="font-bold text-2xl">{sucessAppointments.length}</p></div>
      <div className="bg-white m-2 p-3 rounded-lg h-20 w-1/3 flex justify-between items-center shadow-md"><i class="fa-solid fa-calendar-check fa-xl"></i><h1 className="flex justify-center font-semibold">Approved Appointments: </h1><p className="font-bold text-2xl">{approvedAppointments.length}</p></div>
      <div className="bg-white m-2 p-3 rounded-lg h-20 w-1/3 flex justify-between items-center shadow-md"><i class="fa-regular fa-calendar-xmark fa-xl"></i><h1 className="flex justify-center font-semibold">Rejected Appointments: </h1><p className="font-bold text-2xl">{rejectedAppointments.length}</p></div>
      </div>
      <div className=" flex justify-center">
      <div className="bg-white m-2 p-3 rounded-lg h-20 w-1/3 flex justify-between items-center shadow-md"><i class="fa-solid fa-calendar-day fa-xl"></i><h1 className="flex justify-center font-semibold">Pending Appointments: </h1><p className="font-bold text-2xl">{pendingAppointments.length}</p></div>
      <div className="bg-white m-2 p-3 rounded-lg h-20 w-1/3 flex justify-between items-center shadow-md"><i class="fa-solid fa-clipboard fa-xl"></i><h1 className="flex justify-center font-semibold">Prescriptions Appointments: </h1><p className="font-bold text-2xl">{prescriptions.length}</p></div>
      </div> 
      <div>
        
      </div>
    </Layout>
  );
}

export default Userdashboard;
