
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
import PersonalDisplay from './Pages/ServicesDisplay/PersonalDisplay'
import NursingDisplay from './Pages/ServicesDisplay/NursingDisplay'
import SupportDisplay from './Pages/ServicesDisplay/SupportDisplay'
import EmploymentDisplay from './Pages/ServicesDisplay/EmploymentDisplay'
import TransportDisplay from './Pages/ServicesDisplay/TransportDisplay'
import RespiteDisplay from './Pages/ServicesDisplay/RespiteDisplay'



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
          <Route path='/personal-support' element={<PersonalDisplay />} />
          <Route path='/nursing-support' element={<NursingDisplay />} />
          <Route path='/supported-living' element={<SupportDisplay />} />
          <Route path='/employment-services' element={<EmploymentDisplay />} />
          <Route path='/transportation' element={<TransportDisplay />} />
          <Route path='/respite-care' element={<RespiteDisplay />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
