import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { Form, Input, Row, Col, Button, message, Spin } from "antd";
import Layout from "../../components/Layout"; // Adjust the path according to your project structure
import { showLoading, hideLoading } from "../../redux/alertsSlice"; // Adjust this import according to your project structure
import { useNavigate } from "react-router-dom";
import { setUser } from '../../redux/userSlice';
import UserForm from "./UserForm";
import toast from 'react-hot-toast';

export default function Profile() {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/get-user-info-by-id', { token: localStorage.getItem('token') }, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('token'),
        }
      });

      dispatch(hideLoading());

      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/update-user-profile',
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
          },
        });
      dispatch(hideLoading());
      if (response.data.success) {
        // dispatch(setUser(response.data.data));
        toast.success(response.data.message);
        navigate("/user-dashboard/profile/:userId");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  }

  return (
    <Layout>
      <h1 className="page-title">User Profile</h1>
      <hr />
      <UserForm onFinish={onFinish} initialValues={user} /> 
    </Layout>
  );
}
