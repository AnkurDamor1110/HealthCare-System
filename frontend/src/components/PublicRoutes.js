import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoutes(props) {
 
    if(localStorage.getItem('token')){
        return <Navigate to="/user-dashboard"/>;
    } else {
        return props.children;
    }
}

export default PublicRoutes
