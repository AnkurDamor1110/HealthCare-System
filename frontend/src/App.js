import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import UserDashboard from './pages/Home';
import HomePage from './components/HomePage';
import Contact from './pages/Contact';
import Services from './pages/Services';
import DoctorsForHome from './pages/DoctorsForHome';
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
import Addmedicine from './pages/Midiciens/Addmidiciens';
import MedicineList from './pages/Midiciens/MedicineList';
import Editmedicine from './pages/Midiciens/Editmidiciens';
import AddPrescriptionForm from './pages/Prescriptions/PrescriptionForm';
import PrescriptionView from './pages/Prescriptions/PrescriptionView';
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
          <Route path='/contact' element={<Contact />} />
          <Route path='/services' element={<Services />} />
          <Route path='/doctors' element={<DoctorsForHome />} />
          <Route path='/medicines' element={<ProtectedRoute> <MedicineList/> </ProtectedRoute>} />
          <Route path='/medicines/add' element={<Addmedicine/>} />
          <Route path='/medicines/edit/:id' element={<Editmedicine/>} />
          <Route path='/prescriptions' element={<AddPrescriptionForm />} />
          <Route path='/prescriptionview' element={ <PrescriptionView />} />
          <Route path='/login' element={<PublicRoutes> <Login /> </PublicRoutes>} />
          <Route path='/register' element={<PublicRoutes> <Register /> </PublicRoutes>} />
          <Route path='/user-dashboard' element={ <ProtectedRoute> <UserDashboard /> </ProtectedRoute>} />
          <Route path='/apply-doctor' element={ <ProtectedRoute> <ApplyDoctor/> </ProtectedRoute>} />
          <Route path='/notifications' element={ <ProtectedRoute> <Notifications/> </ProtectedRoute>} />
          <Route path='/admin/userslist' element={ <ProtectedRoute> <Userslist/> </ProtectedRoute>} />
          <Route path='/admin/doctorslist' element={ <ProtectedRoute> <Doctorslist/> </ProtectedRoute>} />
          <Route path='/doctor/profile/:userId' element={ <ProtectedRoute> <Profile/> </ProtectedRoute>} />
          <Route path='/user-dashboard/book-appointment/:doctorId' element={ <ProtectedRoute> <BookAppointment/> </ProtectedRoute>} />
          <Route path='/appointments' element={ <ProtectedRoute> <Appointment/> </ProtectedRoute>} />
          <Route path='/doctor/appointments' element={ <ProtectedRoute> <DoctorsAppointment/> </ProtectedRoute>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
