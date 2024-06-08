import React from 'react'
import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

function UserForm({ onFinish, initialValues }) {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(-1); 
  };

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

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please select your gender!' }]}
      >
        <Select placeholder='Select gender'>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Profile Image"
        name="profilePicture"
        // valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload your profile image!' }]}
      >
        {initialValues && initialValues.profilePicture && (
          <div>
            <img 
              src={initialValues.profilePicture.url} 
              alt="Profile" 
              style={{ width: 100, marginBottom: 10 }}
            />
          </div>
        )}
        <Upload 
          name="profilePicture"
          listType="picture"
          beforeUpload={() => false}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button className="primary-button my-2" type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserForm;
