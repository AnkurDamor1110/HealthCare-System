import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import Layout from "../../components/Layout";
import { Pie } from "react-chartjs-2";
import "./Doctordashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Doctordashboard() {
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [sucessAppointments, setsucessAppointments] = useState([]);
  const [pendingAppointments, setpendingAppointments] = useState([]);
  const [approvedAppointments, setapprovedAppointments] = useState([]);
  const [rejectedAppointments, setrejectedAppointments] = useState([]);
  const [doctorUsers, setdoctorUsers] = useState([]);
  const [userName, setUserName] = useState("Doctor Name"); // Replace with actual user name
  const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/doctor/get-appointments-by-doctor-id",
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
        "/api/doctor/get-success-appointments-by-doctor-id",
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
        "/api/doctor/get-padding-appointments-by-doctor-id",
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
        "/api/doctor/get-approved-appointments-by-doctor-id",
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
        "/api/doctor/get-rejected-appointments-by-doctor-id",
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
  const getDoctorUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/doctor/get-users-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          }, 
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setdoctorUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAppointments();
    getSuccessAppointments();
    getPendingAppointments();
    getApprovedAppointments();
    getRejectedAppointments();
    getDoctorUser();
  }, []);
  
  const pieData = {
    labels: ["Success", "Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [
          sucessAppointments.length,
          pendingAppointments.length,
          approvedAppointments.length,
          rejectedAppointments.length,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#FF6384"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Appointments Overview",
      },
    },
  };
  
  return (
    <Layout>
      <div className="dashboard-header">
        <div className="header-background">
          <div className="header-content">
            <h1>Welcome Dr. {user.name}</h1>
          </div>
        </div>
        <hr />
      </div>
      <div className="dashboard-stats">
        <h2>
          <i className="fas fa-calendar-check icon"></i>
          Total Appointments:{" "}
          <span className="number">{appointments.length}</span>
        </h2>
        <h2>
          <i className="fas fa-check icon"></i>
          Total Success Appointments:
          <div className="chart">
            <span className="number">{sucessAppointments.length}</span>
          </div>
        </h2>
        <h2>
          <i className="fas fa-clock icon"></i>
          Total Pending Appointments:{" "}
          <span className="number">{pendingAppointments.length}</span>
        </h2>
        <h2>
          <i className="fas fa-thumbs-up icon"></i>
          Total Approved Appointments:{" "}
          <span className="number">{approvedAppointments.length}</span>
        </h2>
        <h2>
          <i className="fas fa-times icon"></i>
          Total Rejected Appointments:{" "}
          <span className="number">{rejectedAppointments.length}</span>
        </h2>
        <h2>
          <i className="fas fa-user-md icon"></i>
          Total Doctor's Users:{" "}
          <span className="number">{doctorUsers.length}</span>
        </h2>
      </div>
      <div className="charts">
        <div className="pie-chart">
         <Pie data={pieData} options={pieOptions} style={{ width: '100%', height: '300px' }} />
        </div>
      </div>
    </Layout>
  );
}

export default Doctordashboard;
