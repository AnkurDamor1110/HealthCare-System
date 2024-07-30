import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout";
import DoctorForm from '../../components/DoctorForm';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import toast from 'react-hot-toast';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
// import { setUser } from '../../redux/userSlice';
// import moment from "moment";
function Profile() {

    const apiUrl = process.env.REACT_APP_API_URL;
    const {user} = useSelector( (state) => state.user);
    const params = useParams();
    const [doctor,setDoctor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post(`${apiUrl}/api/doctor/update-doctor-profile`, 
            {
                ...values, 
                userId: user._id,
                timings: [
                    values.timings[0].format("HH:mm"),
                    values.timings[1].format("HH:mm")
                ],
            }, 
            {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                navigate("/approved-doctor");
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    }


        useEffect(()=> {

            const getDoctorData = async()=>{

                try {
                    dispatch(showLoading());
                    const response = await axios.post(`${apiUrl}/api/doctor/get-doctor-info-by-user-id`,
                    {
                        userId: params.userId,
                    },
                   {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem('token'),
                        }
                    });
                    dispatch(hideLoading());
        
                    if(response.data.success){
                       setDoctor(response.data.data);
                       
                    }
                } catch (error) {
                 
                    dispatch(hideLoading());
                    
                }
            };

            getDoctorData();
           
        },[dispatch, params.userId]);

  return (
    <Layout>
        <h1 className="page-title">Doctor Profile</h1>
        <hr/>
        {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor}/>}
    </Layout>
  )
}

export default Profile
