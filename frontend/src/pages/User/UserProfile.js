import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from '../../redux/userSlice';
import UserForm from "./UserForm";
import toast from 'react-hot-toast';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  const onFinish = async (values) => {
    // console.log('Form values:', values);
    try {
      dispatch(showLoading());
  
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('gender', values.gender);
      formData.append('profilePicture', values.profilePicture);
  
      // console.log('Profile Picture:', formData.get('profilePicture')); // This should now log the file object
  
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]); 
      // }
  
      const response = await axios.post(
        '/api/user/update-user-profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setUserData(response.data.data); // Update local state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
      console.log(error);
    }
  };
  
  

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
        setUserData(response.data.data);
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">User Profile</h1>
      <hr />
      {userData && <UserForm onFinish={onFinish} initialValues={userData} />}
    </Layout>
  );
}
