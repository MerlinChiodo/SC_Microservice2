import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import NewsletterForm from "./pages/NewsletterForm"
import CalendarEntryForm from "./pages/CalendarEntryForm";
import AboutUsForm from "./pages/AboutUsForm";
import Inquiries from "./pages/Inquiries";
import Map from "./pages/Map";


function App() {
  return (
      <Router>
              <Navbar/>

                  <Routes>
                      <Route path='/' element={
                              <>
                                  <Map/>
                              </>
                      }/>
                      <Route path='/home' element={<Home/>}/>
                      <Route path='/employee' element={<Employee/>} />
                      <Route path='/articleform' element={<NewsletterForm/>} />
                      <Route path='/calendarform' element={<CalendarEntryForm/>} />
                      <Route path='/aboutusform' element={<AboutUsForm/>}/>
                      <Route path="/inquiries" element={<Inquiries/>}/>
                  </Routes>
      </Router>
  )
}

export default App
