import React, { useEffect, useState, useCallback } from 'react'
import Layout from "../../components/Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

function Userslist() {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getUserData = useCallback(async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get(`${apiUrl}/api/admin/get-all-users`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    }, [dispatch, apiUrl]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                return (
                    <div className="d-flex">
                        <h1 className='anchor'>Block</h1>
                    </div>
                )
            }
        },
    ];

    return (
        <Layout>
            <h1 className="page-title">User List</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Userslist;
