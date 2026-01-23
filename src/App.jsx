import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Earbuds from './pages/Earbuds'
import Headphone from './pages/Headphone'
import Shops from './pages/Shops'
import Navbar from './components/Navbar'
import BackgroundOrbs from './components/BackgroundOrbs'
import './style.css'
import './responsive.css'

function App() {
  return (
    <Router>
      <Navbar />
      <BackgroundOrbs />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/earbuds" element={<Earbuds />} />
          <Route path="/headphone" element={<Headphone />} />
          <Route path="/shop" element={<Shops />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App