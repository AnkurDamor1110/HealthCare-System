import React, { useState } from 'react';
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faUserDoctor, faBell, faCalendarCheck, faFileMedical, faSignOutAlt, faCapsules, faUsers, faHospital, faSquareH, faEnvelopeOpenText, faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios';

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    // const [image, setImage] = useState('');

    // const fecthImg = async () =>{
    //     try {
    //         const imgUrl = await axios.get('/api/get-profilePicture-by-user-id',{
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
    //               },
    //         });
            
    //         if(imgUrl.data.success){
    //             setImage(imgUrl);
    //         }
    //         else{
    //             console.log(imgUrl.data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching Profile-Picture:', error);
    //     }
    // }
    const userMenu = [
      
        {
            name: 'Approved Doctors',
            path: '/approved-doctor',
            icon: faUserDoctor,
        },
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
        {
            name: 'Profile',
            path: `/user/profile/${user?._id}`,
            icon: faUser,
        },
    ];

    const doctorMenu = [
        {
            name: 'Approved Doctors',
            path: '/approved-doctor',
            icon: faUserDoctor,
        },
        {
            name: 'Dashboard',
            path: '/doctor-dashboard',
            icon: faHouse,
        },
        
        {
            name: 'Appointments',
            path: '/doctor/appointments',
            icon: faCalendarCheck,
        },
        {
            name: 'Medicines',
            path: '/medicines',
            icon: faCapsules,
        },
        {
            name: 'Prescriptions',
            path: '/prescriptions',
            icon: faFileMedical,
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: faUser,
        },
    ];

    const adminMenu = [
        {
            name: 'Approved Doctors',
            path: '/approved-doctor',
            icon: faUserDoctor,
        },
        {
            name: 'Dashboard',
            path: '/admin-dashboard',
            icon: faHouse,
        },
       
        {
            name: 'Users',
            path: '/admin/userslist',
            icon: faUsers,
        },
        {
            name: 'Customer suggetions',
            path: '/admin/contactlist',
            icon: faEnvelopeOpenText,
        },
        {
            name: 'Doctors',
            path: '/admin/doctorslist',
            icon: faHospital,
        },
        {
            name: 'Medicines',
            path: '/medicines',
            icon: faCapsules,
        },
        {
            name: 'Profile',
            path: `/user/profile/${user?._id}`,
            icon: faUser,
        },
    ];

    // useEffect(()=>{
    //     fecthImg();
    // },[user._id])

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

    return (
        <div className='flex h-screen bg-gray-100'>
            <div className={`flex flex-col ${collapsed ? 'w-20' : 'w-64'} bg-[#31b372] text-black transition-all duration-300`}>
                <div className="p-4 border-b border-[#83C5BE] flex flex-col items-center">
                    {collapsed?<FontAwesomeIcon icon={faSquareH} className="icon" style={{ color: "#ffffff", fontSize: "1.5rem", justifyContent:'center' }} />:<h1 className="text-2xl font-bold">HealthCare</h1>}
                    <h2 className="text-lg font-normal">{role}</h2>
                </div>
                <div className="flex flex-col mt-4 space-y-2">
                    {menuToBeRendered.map((menu) => {
                        const isActive = location.pathname === menu.path;
                        return (
                            <div 
                                key={menu.name} 
                                className={`flex items-center p-4 hover:bg-[#E4D9FF] ${isActive ? 'bg-[#E4D9FF]' : ''} cursor-pointer`}
                                onClick={() => navigate(menu.path)}
                            >
                                <FontAwesomeIcon icon={menu.icon || faUser} />
                                {!collapsed && <span className="ml-4">{menu.name}</span>}
                            </div>
                        );
                    })}
                    <div className="flex items-center p-4 hover:bg-blue-700 cursor-pointer" onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        {!collapsed && <span className="ml-4">Logout</span>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between p-4 bg-[#31b372] text-black">
                    <button onClick={() => setCollapsed(!collapsed)} className="focus:outline-none">
                        {collapsed ? <i class="fa-solid fa-bars"></i> :<i className="fa-solid fa-xmark fa-lg"></i>}
                    </button>
                    <div className="flex items-center space-x-4">
                        <Badge className='cursor-pointer' count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                            <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
                        </Badge>
                        <div className='flex flex-row items-center'>
                            <img className='h-10 rounded-full ml-3' src={user?.profilePicture} alt="img" />
                            <Link to={`/user/profile/${user?._id}`} className="text-black text-lg mx-2 font-semibold">{user?.name}</Link>
                        </div>
                        
                    </div>
                </div>
                <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;