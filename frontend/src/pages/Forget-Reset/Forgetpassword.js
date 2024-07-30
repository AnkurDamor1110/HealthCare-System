import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ForgetPassword() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { id, token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/user/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (data.status === 201) {
                setPassword("");
                setMessage("Password updated successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setMessage("Token expired or invalid. Please request a new link.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className='authentication hero__section'>
            <div className='authentication-form card p-3'>
                <h3 className='text-headingcolor text-[22px] leading-9 font-bold mb-10'>
                    Enter Your<span className='text-primarycolor'> New Password</span>
                </h3>

                {message && <p className={`text-${message.includes("successfully") ? 'green' : 'red'}-600`}>{message}</p>}

                <Form layout='vertical' onFinish={handleSubmit} requiredMark={false}>
                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters long' }
                        ]}
                    >
                        <Input placeholder='Enter New Password' value={password} onChange={handlePasswordChange} />
                    </Form.Item>
  
                    <Form.Item>
                        <Button className="primary-button my-2" type="primary" htmlType="submit">
                            Send
                        </Button>
                    </Form.Item>

                    <p className='mt-3 text-textcolor text-center'>
                        Want to go back?{" "}
                        <Link to="/login" className='text-primarycolor font-bold ml-1'>Click here</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default ForgetPassword;
