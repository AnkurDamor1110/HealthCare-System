import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgetpassword from './pages/Forget-Reset/Forgetpassword';
import { Toaster } from 'react-hot-toast';
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
import Contactlist from './pages/Admin/Contactlist';
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
import UserProfile from './pages/User/UserProfile';
import Admindashboard from './pages/Dashboard/Admindashboard';
import Doctordashboard from './pages/Dashboard/Doctordashboard';
import UserInterviewDetails from './pages/Admin/InterviewView';
import ApprovedDoctorHome from './pages/ApprovedDoctorHome';
import Userdashboard from './pages/Dashboard/Userdashboard';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Resetpassword from './pages/Forget-Reset/Resetpassword';
import ErrorPage from './pages/errorpage';

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
          <Route path='*' element={<ErrorPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/services' element={<Services />} />
          <Route path='/doctors' element={<DoctorsForHome />} />
          <Route path='/medicines' element={<ProtectedRoute> <MedicineList/> </ProtectedRoute>} />
          <Route path='/medicines/add' element={<Addmedicine/>} />
          <Route path='/medicines/edit/:id' element={<Editmedicine/>} />
          <Route path='/prescriptions' element={<AddPrescriptionForm />} />
          <Route path='/prescriptionview' element={ <PrescriptionView />} />
          <Route path='/admin-dashboard' element={ <Admindashboard/>} />
          <Route path='/doctor-dashboard' element={ <Doctordashboard/> }/> 
          <Route path='/user-dashboard' element={ <Userdashboard/> }/>
          <Route path='/interview-details' element={ <UserInterviewDetails/> }/>
          <Route path='/login' element={<PublicRoutes> <Login /> </PublicRoutes>} />
          <Route path='/register' element={<PublicRoutes> <Register /> </PublicRoutes>} />
          <Route path='/forget-password/:id/:token' element={<PublicRoutes> <Forgetpassword /> </PublicRoutes>} />
          <Route path='/reset-password' element={<PublicRoutes> <Resetpassword /> </PublicRoutes>} />
          <Route path='/approved-doctor' element={ <ProtectedRoute> <ApprovedDoctorHome/> </ProtectedRoute>} />
          <Route path='/apply-doctor' element={ <ProtectedRoute> <ApplyDoctor/> </ProtectedRoute>} />
          <Route path='/notifications' element={ <ProtectedRoute> <Notifications/> </ProtectedRoute>} />
          <Route path='/admin/userslist' element={ <ProtectedRoute> <Userslist/> </ProtectedRoute>} />
          <Route path='/admin/contactlist' element={ <ProtectedRoute> <Contactlist/> </ProtectedRoute>} />
          <Route path='/admin/doctorslist' element={ <ProtectedRoute> <Doctorslist/> </ProtectedRoute>} />
          <Route path='/doctor/profile/:userId' element={ <ProtectedRoute> <Profile/> </ProtectedRoute>} />
          <Route path='/approved-doctor/book-appointment/:doctorId' element={ <ProtectedRoute> <BookAppointment/> </ProtectedRoute>} />
          <Route path='/appointments' element={ <ProtectedRoute> <Appointment/> </ProtectedRoute>} />
          <Route path='/doctor/appointments' element={ <ProtectedRoute> <DoctorsAppointment/> </ProtectedRoute>} />
          <Route path='/user/profile/:userId' element={ <ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
          <Route path='/checkout-success' element={ <ProtectedRoute> <CheckoutSuccess /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
