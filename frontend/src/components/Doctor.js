import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { Rate } from 'antd';

function Doctor({ doctor }) {
    const [rating, setRating] = useState(0); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getRating = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get(`/api/user/get-reviews-rating?doctorId=${doctor._id}`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setRating(response.data.averageRating);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Failed to fetch rating:", error);
        }
    }

    useEffect(() => {
        getRating();
    }, [doctor._id]);

    return (
        <div className='card p-2 cursor-pointer' onClick={() => navigate(`/approved-doctor/book-appointment/${doctor._id}`)}>
            <h1 className="card-title">{doctor.firstName} {doctor.lastName}</h1>
            <hr />
            <img src={doctor.photo} width={'200px'} height={'200px'} alt={`${doctor.firstName} ${doctor.lastName}`} />
            <p><b>Specialization:</b> {doctor.specialization}</p>
            <p><b>Phone Number:</b> {doctor.phoneNumber}</p>
            <p><b>Address:</b> {doctor.address}</p>
            <p><b>Fee per Visit:</b> {doctor.feesPerConsultation}</p>
            <p><b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}</p>
            <p>Rating: <Rate allowHalf value={rating} disabled /></p>
            
        </div>
    )
}

export default Doctor;
