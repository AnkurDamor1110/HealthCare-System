import React from 'react'
import Layout from '../components/Layout'
import { Button, Col, Form, Input, Row, TimePicker  } from 'antd'

function ApplyDoctor() {

const onFinish = (values) =>{
    console.log("Success", values);
}

  return (
    <Layout>
        <h1 className='page-title'>Apply Doctor</h1>

        <Form layout='vertical' onFinish={onFinish}>
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
                    <Form.Item  required label="Experience" name="experience" htmlType="number" rules={[ {required : true}]}>
                        <Input placeholder='Experience'/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item  required label="Free Peer Cunsultation" name="freePeerCunsultation" htmlType="number" rules={[ {required : true}]}>
                        <Input placeholder='Free Peer Cunsultation'/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item  required label="Timings" name="timings" rules={[ {required : true}]}>
                    <TimePicker.RangePicker />
                    </Form.Item>
                </Col>
            </Row>

            <div className="d-flex">
                <Button className='primary-button' htmlType='submit'>Apply</Button>
            </div>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor
