import React, { useState } from 'react';
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Badge, Calendar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser,faUserDoctor, faBell, faCalendarCheck, faFileMedical, faSignOut, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Layout({ children }) {

    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    const userMenu = [
        {
            name: 'Dashboard',
            path: '/user-dashboard',
            icon: faHouse,
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: faCalendarCheck,
        },
        {
            name: 'PrescriptionView',
            path: '/prescriptionview',
            icon: faFileMedical,
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: faUserDoctor,
        },
        // {
        //     name: 'Profile',
        //     path: '/profile',
        //     icon: '',
        // },
    ];

    const doctorMenu = [
        {
            name: 'Dashboard',
            path: '/user-dashboard',
            icon: faHouse,
        },
        {
            name: 'Appointments',
            path: '/doctor/appointments',
            icon: '',
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: faUser,
        },
        {
            name: 'Medicines',
            path: '/medicines',
            icon: '',
        },
        {
            name: 'Prescriptions',
            path: '/prescriptions',
            icon: '',
        },
    ];

    const adminMenu = [
        {
            name: 'Dashboard',
            path: '/user-dashboard',
            icon: faHouse,
        },
        {
            name: 'Users',
            path: '/admin/userslist',
            icon: '',
        },
        {
            name: 'Doctors',
            path: '/admin/doctorslist',
            icon: '',
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: faUser,
        },
        {
            name: 'Medicines',
            path: '/medicines',
            icon: '',
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
                            const isActive = location.pathname === menu.path;
                            return (
                                <div key={menu.name} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                    <Link to={menu.path} ><FontAwesomeIcon icon={menu.icon || faUser} /></Link>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            );
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear();
                            navigate("/");
                        }}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            {!collapsed && <Link to='/'>Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="header">
                        {collapsed ? (
                            <i className='ri-close-fill icon mr-2' onClick={() => setCollapsed(false)}>X</i>
                        ) : (
                            <i className='ri-close-fill icon' onClick={() => setCollapsed(true)}>=</i>
                        )}

                        <div className="d-flex align-items-center px-4">
                            <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                                <FontAwesomeIcon icon={faBell} className="px-2 cursor-pointer" />
                            </Badge>
                            <Link className='anchor ml-5' to='/profile'>{user?.name}</Link>
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
