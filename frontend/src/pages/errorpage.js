import React from 'react'
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function errorpage() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,water')" }}>
      <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg text-center">
        <ExclamationTriangleIcon className="w-24 h-24 text-red-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page Not Found</p>
        <Link to="/" className="text-xl text-blue-600 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  )
}

export default errorpage
