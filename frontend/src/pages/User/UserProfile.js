import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
// import { useNavigate } from "react-router-dom";
import { setUser } from '../../redux/userSlice';
import UserForm from "./UserForm";
import toast from 'react-hot-toast';

export default function Profile() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
  
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('gender', values.gender);
      formData.append('profilePicture', values.profilePicture);
  
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
      <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 w-1/2 mx-auto rounded-lg shadow-md">
        <div className="flex justify-center">
          <div className="flex justify-center bg-white w-9/12 rounded-md shadow-sm">
            <h1 className="text-2xl font-bold py-2">User Profile</h1>
          </div>
        </div>
        
        <hr className="my-2" />
        {userData && <UserForm onFinish={onFinish} initialValues={userData} />}
      </div>
    </Layout>
  );
}
