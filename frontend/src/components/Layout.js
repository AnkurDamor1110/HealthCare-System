import React, { useState } from 'react'
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


function Layout({ children }) {


    const [collapsed, setCollapsed] = useState(false);
    const {user} = useSelector((state) => state.user);
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
        {
            name: 'Profile',
            path: '/profile',
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
            path: '/users',
            icon: ''
        },
        {
            name: 'Doctors',
            path: '/doctors',
            icon: ''
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: ''
        },
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

    return (
        <div className='main'>
            <div className="d-flex layout">
                <div className={`${collapsed ? 'collapsed-sidebar' : 'sidebar'}`}>
                    <div className="sidebar-header">
                        <h1>HealthCare</h1>
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
                        <div className={`d-flex menu-item `} onClick={() =>{
                            localStorage.clear();
                            navigate("/login");
                        }}>
                                <i className=''></i>
                                {!collapsed && <Link to='/login'>Logout</Link>}
                            </div>
                    </div>
                </div>

                <div className="content">

                    <div className="header">
                        {collapsed ? <i className='ri-close-fill icon mr-2' onClick={() => setCollapsed(false)}>X</i> : <i className='ri-close-fill icon' onClick={() => setCollapsed(true)}>=</i>}

                        <div className="d-flex align-items-center px-4">
                            <i className='ri -notification-line  px-2'>@</i>
                            <Link className='anchor' to='/profile'>{user?.name}</Link>
                        </div>
                    </div>

                    <div className="body">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Layout
