import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CheckoutSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.success('Appointment successfully booked!');
        
        const timer = setTimeout(() => {
            navigate('/appointments');
        }, 5000);

        // Cleanup the timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <Toaster />
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16 text-green-500 mx-auto my-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7" 
                    />
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold">Payment Done!</h3>
                    <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    <p>Have a great day!</p>
                    <div className="py-10 text-center">
                        <Link 
                            to='/appointments'
                            className='px-12 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300'
                        >
                            Go Appointments Section
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
