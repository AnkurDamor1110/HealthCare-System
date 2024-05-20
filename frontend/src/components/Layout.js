import React, { useState } from 'react'
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {Badge} from "antd";

function Layout({ children }) {


    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-smile-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: ''
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: ''
        },
        // {
        //     name: 'Profile',
        //     path: '/profile',
        //     icon: ''
        // },
    ];

    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-smile-line'
        },
        {
            name: 'Appointments',
            path: '/doctor/appointments',
            icon: ''
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: ''
        },
        {
            name: 'Mediciens',
            path: '/medicines',
            icon: ''
        },
    ];

    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-smile-line'
        },
        {
            name: 'Users',
            path: '/admin/userslist',
            icon: ''
        },
        {
            name: 'Doctors',
            path: '/admin/doctorslist',
            icon: ''
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: ''
        },
        {
            name: 'Mediciens',
            path: '/medicines',
            icon: ''
        },
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
    return (
   
        <div className='main'>
            <div className="d-flex layout">
                <div className={`${collapsed ? 'collapsed-sidebar' : 'sidebar'}`}>
                    <div className="sidebar-header">
                        <h1>HealthCare</h1>
                        <h1 className="normal-text">{role}</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname == menu.path;
                            return (<div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                            );
                        })}
                        <div className={`d-flex menu-item `} onClick={() => {
                            localStorage.clear();
                            navigate("/");
                        }}>
                            <i className=''></i>
                            {!collapsed && <Link to='/'>Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className="content">

                    <div className="header">
                        {collapsed ? <i className='ri-close-fill icon mr-2' onClick={() => setCollapsed(false)}>X</i> : <i className='ri-close-fill icon' onClick={() => setCollapsed(true)}>=</i>}

                        <div className="d-flex align-items-center px-4">
                            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}> 
                            <i className='ri -notification-line  px-2'>@</i>
                            </Badge>
                            
                            <Link className='anchor' to='/profile'>{user?.name}</Link>
                        </div>
                    </div>

                    <div className="body">
                        {children}
                    </div>

                </div>
            </div>
        </div>
        
    );
}

export default Layout;
