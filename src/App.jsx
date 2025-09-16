
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Footer from './Components/Footer'
import Services from './Pages/Services'
import Resources from './Pages/Resources'
import Contact from './Pages/Contact'
import ResidentialDisplay from './Pages/ServicesDisplay/ResidentialDisplay'



function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/residential' element={<ResidentialDisplay />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
