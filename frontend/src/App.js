import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import UserDashboard from './pages/Home';
import HomePage from './components/HomePage';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoutes from './components/PublicRoutes';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import Userslist from './pages/Admin/Userslist';
import Doctorslist from './pages/Admin/Doctorslist';
import Profile from './pages/Doctor/Profile';
import BookAppointment from './pages/BookAppointment';
import Appointment from './pages/Appointment';
import DoctorsAppointment from './pages/Doctor/DoctorAppointment';
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

          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<PublicRoutes> <Login /> </PublicRoutes>} />
          <Route path='/register' element={<PublicRoutes> <Register /> </PublicRoutes>} />
          <Route path='/user-dashboard' element={ <ProtectedRoute> <UserDashboard /> </ProtectedRoute>} />
          <Route path='/apply-doctor' element={ <ProtectedRoute> <ApplyDoctor/> </ProtectedRoute>} />
          <Route path='/notifications' element={ <ProtectedRoute> <Notifications/> </ProtectedRoute>} />
          <Route path='/admin/userslist' element={ <ProtectedRoute> <Userslist/> </ProtectedRoute>} />
          <Route path='/admin/doctorslist' element={ <ProtectedRoute> <Doctorslist/> </ProtectedRoute>} />
          <Route path='/doctor/profile/:userId' element={ <ProtectedRoute> <Profile/> </ProtectedRoute>} />
          <Route path='/book-appointment/:doctorId' element={ <ProtectedRoute> <BookAppointment/> </ProtectedRoute>} />
          <Route path='/appointments' element={ <ProtectedRoute> <Appointment/> </ProtectedRoute>} />
          <Route path='/doctor/appointments' element={ <ProtectedRoute> <DoctorsAppointment/> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
