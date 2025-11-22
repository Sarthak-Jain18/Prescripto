import './App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminContext } from './context/AdminContext.jsx'
import { DoctorContext } from './context/DoctorContext.jsx'

import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import AllAppointments from './pages/Admin/AllAppointments.jsx'
import AddDoctor from './pages/Admin/AddDoctor.jsx'
import DoctorsList from './pages/Admin/DoctorsList.jsx'

import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx'
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx'
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx'

export default function App() {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ?
    (
      <div className='bg-[#F8F9FD]'>

        <Navbar />

        <div className='flex items-start'>
          <Sidebar />
          <Routes>

            {/* ADMIN ROUTE */}
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorsList />} />

            {/* DOCTOR ROUTE */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />

          </Routes>
        </div>

        <ToastContainer />

      </div>
    ) : (
      <div>
        <Login />
        <ToastContainer />
      </div>
    )
}