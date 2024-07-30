import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';


function ProtectedRoute(props) {

    const apiUrl = process.env.REACT_APP_API_URL;
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 


        useEffect(()=> {

            const getUser = async()=>{

                try {
                    dispatch(showLoading());
                    const response = await axios.post(`${apiUrl}/api/user/get-user-info-by-id`, {token: localStorage.getItem('token')} , {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem('token'),
                        }
                    });
                
                    dispatch(hideLoading());
        
                    if(response.data.success){
                        dispatch(setUser(response.data.data));
                       
                    }else {
                        localStorage.clear();
                        navigate("/")
                    }
                } catch (error) {
                    localStorage.clear();
                    dispatch(hideLoading());
                    navigate("/")
                }
            };

            if(!user){
                getUser();
            }
           
        },[user, dispatch, navigate, apiUrl]);

    if(localStorage.getItem('token')){
        return props.children;
    } else {
        return <Navigate to="/"/>;
    }
 
}

export default ProtectedRoute
