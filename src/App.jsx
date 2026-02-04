import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Earbuds from './pages/Earbuds'
import Headphone from './pages/Headphone'
import Shops from './pages/Shops'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Navbar from './components/Navbar'
import BackgroundOrbs from './components/BackgroundOrbs'
import './style.css'
import './responsive.css'

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <BackgroundOrbs />
      <div className="pt-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/earbuds" element={<Earbuds />} />
            <Route path="/headphone" element={<Headphone />} />
            <Route path="/shop" element={<Shops />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  )
}

export default App