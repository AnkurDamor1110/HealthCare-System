import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, TimePicker, Upload, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PDFDocument } from 'pdf-lib';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { RangePicker } = TimePicker;

function DoctorForm({ onFinish, initialValues={} }) {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [pdfFileList, setPdfFileList] = useState([]);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.user);

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

  const handlePdfChange = async ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
  
      // Validate PDF file for single page
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        if (pdfDoc.getPageCount() > 1) {
          message.warning('Please note that only a single-page resume is recommended.');
        }
  
        setPdfFileList(fileList);
        setPreviewPdf(file.name);
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setPdfFileList([]);
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

  const saveFiles = async (values) => {
    try {
      const data = new FormData();
      let imageUrl = initialValues?.photo || '';
      let resumeUrl = initialValues?.resume || '';

      if (fileList.length > 0) {
        data.append('file', fileList[0].originFileObj);
        data.append('upload_preset', 'myCloud');
        data.append('cloud_name', 'drous2rbk');

        const res = await fetch('https://api.cloudinary.com/v1_1/drous2rbk/image/upload', {
          method: 'POST',
          body: data,
        });
        const cloudData = await res.json();
        imageUrl = cloudData.url;
      }

      if (pdfFileList.length > 0) {
        const pdfData = new FormData();
        pdfData.append('file', pdfFileList[0].originFileObj);
        pdfData.append('upload_preset', 'myCloud');
        pdfData.append('cloud_name', 'drous2rbk');

        const res = await fetch('https://api.cloudinary.com/v1_1/drous2rbk/image/upload', {
          method: 'POST',
          body: pdfData,
        });
        const cloudData = await res.json();
        resumeUrl = cloudData.url.replace(".pdf", ".jpg");
      }

      onFinish({ ...values, photo: imageUrl, resume: resumeUrl });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error uploading files');
      onFinish(values); // Return original values if file upload fails
    }
  };


  // const handleFinish = async (values) => {
  //   try {
  //     dispatch(showLoading());
  //     const updatedValues = await saveFiles(values);

  //     const response = await axios.post(
  //       '/api/user/apply-doctor-account',
  //       {
  //         ...updatedValues,
  //         userId: user._id,
  //         timings: [
  //           values.timings[0].format('HH:mm'),
  //           values.timings[1].format('HH:mm'),
  //         ],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ` + localStorage.getItem('token'),
  //         },
  //       }
  //     );

  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate('/user-dashboard');
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(hideLoading());
  //     toast.error('Something went wrong');
  //   }
  // };

  return (
    <Form
      layout="vertical"
      // onFinish={handleFinish}
      onFinish={saveFiles}
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
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please input your first name!' },
              { min: 3, message: 'Name must be at least 3 characters' },
              { max: 20, message: 'Name cannot exceed 20 characters' },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'Please input your last name!' },
              { min: 3, message: 'Name must be at least 3 characters' },
              { max: 20, message: 'Name cannot exceed 20 characters' },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Website"
            name="website"
            rules={[
              { required: true, message: 'Please input your website URL!' },
              { type: 'url', message: 'Please enter a valid website URL' },
            ]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please input your address!' },
              { min: 5, message: 'Address must be at least 5 characters' },
              { max: 50, message: 'Address cannot exceed 50 characters' },
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
            label="Specialization"
            name="specialization"
            rules={[
              { required: true, message: 'Please input your specialization!' },
              { min: 5, message: 'Specialization must be at least 5 characters' },
              { max: 50, message: 'Specialization cannot exceed 50 characters' },
            ]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true, message: 'Please input your experience!' }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Fees Per Consultation"
            name="feesPerConsultation"
            rules={[{ required: true, message: 'Please input your fees per consultation!' }]}
          >
            <Input placeholder="Fees Per Consultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Timings"
            name="timings"
            rules={[{ required: true, message: 'Please input your timings!' }]}
          >
            <RangePicker format="HH:mm" />
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
            {!previewImage && initialValues.photo && (
              <div className="image-preview">
                <img
                  src={initialValues.photo}
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
            {!previewPdf && initialValues.resume && (
              <div className="pdf-preview">
                <p onClick={showModal} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                  {initialValues.resume && (
                    <Button type="primary" onClick={showModal} style={{ marginTop: '20px' }}>
                      View PDF
                    </Button>
                  )}
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
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            style={{ width: '100%', height: '80vh', border: 'none' }}
            title="Resume"
          ></iframe>
        )}
        {!pdfUrl && initialValues.resume && (
          <iframe
            src={initialValues.resume}
            style={{ width: '100%', height: '80vh', border: 'none' }}
            title="Resume"
          ></iframe>
        )}
      </Modal>

    </Form>
  );
}

export default DoctorForm;
