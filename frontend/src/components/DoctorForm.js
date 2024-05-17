import React from 'react'
import Layout from '../components/Layout'
import { Button, Col, Form, Input, Row, TimePicker  } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function DoctorForm({onFinish, initialValues}) {
  return (
    <Form layout='vertical' onFinish={onFinish} initialValues={{
        ...initialValues,
        timings: initialValues?.timings ? [
            moment(initialValues.timings[0], 'HH:mm'),
            moment(initialValues.timings[1], 'HH:mm')
          ] : []
        
    }}>
    <h1 className="card-title">Personal Information</h1>
    <hr/>
    <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="First Name" name="firstName" rules={[ {required : true}]}>
                <Input placeholder='First Name'/>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="Last Name" name="lastName" rules={[ {required : true}]}>
                <Input placeholder='Last Name'/>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="Phone Number" name="phoneNumber" rules={[ {required : true}]}>
                <Input placeholder='Phone Number'/>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="Website" name="website" rules={[ {required : true}]}>
                <Input placeholder='Website'/>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="Address" name="address" rules={[ {required : true}]}>
                <Input placeholder='Address'/>
            </Form.Item>
        </Col>
    </Row>
    <hr/>
    <h1 className="card-title">Professional Information</h1>
    <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="Specializaation" name="specializaation" rules={[ {required : true}]}>
                <Input placeholder='Specializaation'/>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="Experience" name="experience" rules={[ {required : true}]}>
                <Input placeholder='Experience' type='number'/>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item  required label="Free Peer Cunsultation" name="freePeerCunsultation" rules={[ {required : true}]}>
                <Input placeholder='Free Peer Cunsultation' type='number'/>
            </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Timings" name="timings" rules={[{ required: true }]}>
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
    </Row>

    <div className="d-flex">
        <Button className='primary-button' htmlType='submit'>Apply</Button>
    </div>
</Form>
  )
}

export default DoctorForm
