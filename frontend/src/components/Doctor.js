import React from 'react'
import { useNavigate } from 'react-router-dom'

function Doctor({ doctor, rating }) {
    const navigate = useNavigate();
    return (
        <div className='card p-2 cursor-pointer' onClick={() => navigate(`/approved-doctor/book-appointment/${doctor._id}`)}>
            <h1 className="card-title">{doctor.firstName} {doctor.lastName}</h1>
            <hr />
            <img src={doctor.photo} width={'200px'} height={'200px'} ></img>
            <p><b>Specializaation:</b> {doctor.specialization}</p>
            <p><b>Phone Number:</b> {doctor.phoneNumber}</p>
            <p><b>Address:</b> {doctor.address}</p>
            <p><b>Fee per Visit:</b> {doctor.feesPerConsultation}</p>
            <p><b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}</p>
            <p>Rating: {rating ? rating : 'No ratings available'}</p>

        </div> 
    ) 
}


export default Doctor
