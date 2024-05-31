import React from 'react'
// import Layout from '../../components/Layout'
import { Button, Form, Input } from 'antd';
function UserForm({ onFinish, initialValues }) {
  return (  
        <Form layout='vertical' onFinish={onFinish} requiredMark={false} initialValues={initialValues}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { min: 3, message: 'Name must be at least 3 characters' },
                { max: 20, message: 'Name cannot exceed 20 characters' }
              ]}
            >
              <Input placeholder='Name' />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>

            {/* <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                // { validator: validatePassword }
              ]}
            >
              <Input placeholder='Password' type='password' />
            </Form.Item> */}

            <Form.Item>
              <Button className="primary-button my-2" type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
            </Form>

  )
}

export default UserForm
