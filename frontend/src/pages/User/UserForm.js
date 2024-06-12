import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
const { Option } = Select;

function UserForm({ onFinish, initialValues }) {

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const saveImage = async (values) => { // Pass form values to the saveImage function
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "drous2rbk");

    try {
      if (image === null) {
        onFinish(values);
        return;

      }

      const res = await fetch('https://api.cloudinary.com/v1_1/drous2rbk/image/upload', {
        method: "POST",
        body: data
      });

      const cloudData = await res.json();
      setUrl(cloudData.url);
      // toast.success("Image Upload Successfully");

      // Call onFinish with the form values and the updated profilePicture URL
      onFinish({ ...values, profilePicture: cloudData.url });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  return (
    <Form layout='vertical' onFinish={saveImage} requiredMark={false} initialValues={initialValues}>
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
        valuePropName="fileList"
        getValueFromEvent={normFile}
        onChange={(e) => setImage(e.target.files[0])}
        extra="Please upload a profile image"
      >
        <img 
          src={initialValues.profilePicture} 
          alt="Profile" 
          style={{ width: 100, marginBottom: 10 }}
        />
      
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
  );
}

export default UserForm;
