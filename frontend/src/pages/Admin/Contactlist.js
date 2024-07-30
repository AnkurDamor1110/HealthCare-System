import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';

function Contactlist() {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [contacts, setContacts] = useState([]);
    const dispatch = useDispatch();


    useEffect(()=>{

        const getContactData= async()=>{
            try {
                dispatch(showLoading());
                const response = await axios.get(`${apiUrl}/api/admin/customercare`, {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token'),
                    },
                });
                dispatch(hideLoading());
                if(response.data.success){
                    setContacts(response.data.data);
                }
            } catch (error) {
                dispatch(hideLoading());
            }
        }

        getContactData();
    },[dispatch, apiUrl]);

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
        },
        {
            title: 'Message',
            dataIndex: 'message',
        }
    ];
    
  return (
    <Layout>
        <h1 className="page-title">Customer suggetions</h1>
        <Table columns={columns} dataSource={contacts}/>
    </Layout>
  )
}

export default Contactlist

