import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoutes from './components/PublicRoutes';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
function App() {
  const {loading} = useSelector((state) => state.alerts);
  return (
    <div>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
          <div className="spinner-border" role="status">
          </div>
        </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>

          <Route path='/login' element={<PublicRoutes> <Login /> </PublicRoutes>} />
          <Route path='/register' element={<PublicRoutes> <Register /> </PublicRoutes>} />
          <Route path='/' element={ <ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path='/apply-doctor' element={ <ProtectedRoute> <ApplyDoctor/> </ProtectedRoute>} />
          <Route path='/notifications' element={ <ProtectedRoute> <Notifications/> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
