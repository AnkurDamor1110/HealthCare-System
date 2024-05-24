import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, TimePicker, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function DoctorForm({ onFinish, initialValues }) {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [pdfFileList, setPdfFileList] = useState([]);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handlePdfChange = ({ fileList }) => {
    setPdfFileList(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setPreviewPdf(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewPdf(null);
      setPdfUrl('');
    }
  };

  const handleRemove = () => {
    setFileList([]);
    setPreviewImage(null);
  };

  const handlePdfRemove = () => {
    setPdfFileList([]);
    setPreviewPdf(null);
    setPdfUrl('');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{
        ...initialValues,
        timings: initialValues?.timings
          ? [
              moment(initialValues.timings[0], 'HH:mm'),
              moment(initialValues.timings[1], 'HH:mm'),
            ]
          : [],
      }}
    >
      <h1 className="card-title mt-4">Personal Information</h1>
      <hr />
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[
              // { required: true },
              { min: 3, message: 'Name must be at least 3 characters' },
              { max: 20, message: 'Name cannot exceed 20 characters' },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[
              // { required: true },
              { min: 3, message: 'Name must be at least 3 characters' },
              { max: 20, message: 'Name cannot exceed 20 characters' },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[
              // { required: true },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[
              // { required: true },
              {
                type: 'url',
                message: 'Please enter a valid website URL',
              },
            ]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[
              // { required: true },
              { min: 5, message: 'Name must be at least 5 characters' },
              { max: 50, message: 'Name cannot exceed 50 characters' },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-4">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specializaation"
            rules={[
              // { required: true },
              { min: 5, message: 'Name must be at least 5 characters' },
              { max: 50, message: 'Name cannot exceed 50 characters' },
            ]}
          >
            <Input placeholder="Specializaation" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            // rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fees Per Consultation"
            name="freePeerCunsultation"
            // rules={[{ required: true }]}
          >
            <Input placeholder="Fees Per Consultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            // rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Photo" name="photo">
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={handleFileChange}
              maxCount={1}
              fileList={fileList}
              onRemove={handleRemove}
            >
              {fileList.length === 0 && (
                <Button icon={<UploadOutlined />}>Select Photo</Button>
              )}
            </Upload>
            {previewImage && (
              <div className="image-preview">
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ marginTop: '10px', maxHeight: '200px' }}
                />
              </div>
            )}
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Resume (PDF)" name="resume">
            <Upload
              beforeUpload={() => false}
              onChange={handlePdfChange}
              maxCount={1}
              fileList={pdfFileList}
              onRemove={handlePdfRemove}
            >
              {pdfFileList.length === 0 && (
                <Button icon={<UploadOutlined />}>Select PDF</Button>
              )}
            </Upload>
            {previewPdf && (
              <div className="pdf-preview">
                <p onClick={showModal} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                  {previewPdf}
                </p>
              </div>
            )}
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-center">
        <Button
          className="apply-dr-btn bg-primarycolor font-[750] rounded-[30px]"
          htmlType="submit"
        >
          Apply
        </Button>
      </div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width="80%" style={{ top: 20 }}>
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: '80vh', border: 'none' }}
          title="Resume"
        ></iframe>
      </Modal>
    </Form>
  );
}

export default DoctorForm;
