import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import {toast} from "react-hot-toast";

function Doctorslist() {

    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();

    const getDoctorData= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-doctors', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const changeDoctorStatus= async(record, status)=>{
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/admin/change-account-doctor-status',{
                doctorId: record._id, userId: record.userId,status: status
            } ,{
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                getDoctorData();
            }
        } catch (error) {
            toast.error("Error changing Doctor account status");
            dispatch(hideLoading());
        }
    };

    useEffect(()=>{
        getDoctorData();
    },[]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text,record) =>{
                return (
                <span >{record.firstName} {record.lastName}</span>
            )
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text,record) =>{
                return (
                <div className="d-flex">
                    {record.status == "pending" && <h1 className='anchor' onClick={()=>changeDoctorStatus(record,"approved")}>Approve</h1>}
                    {record.status == "approved" && <h1 className='anchor' onClick={()=>changeDoctorStatus(record,"Block")}>Block</h1>}
                </div>
                )
            }
        },
    ];

  return (
    <Layout>
        <h1 className="page-title">Doctor List </h1>
        <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctorslist
