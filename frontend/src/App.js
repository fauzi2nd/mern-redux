import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Users from './pages/user/Users'
import UserAdd from './pages/user/UserAdd'

function App() {
  return (
    <>
      <Router>
        <div className='is-info'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />            
            <Route path='/users' element={<Users />} />            
            <Route path='/users/add' element={<UserAdd />} />            
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
