import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import NewsletterForm from "./pages/NewsletterForm"
import { ChakraProvider } from '@chakra-ui/react'
import CalendarEntryForm from "./pages/CalendarEntryForm";


function App() {
  return (
      <Router>
              <Navbar/>

                  <Routes>
                      <Route path='/' element={
                              <>
                                  <Home/>
                              </>
                      }/>
                      <Route path='/home' element={<Home/>}/>
                      <Route path='/employee' element={<Employee/>} />
                      <Route path='/articleform' element={<NewsletterForm/>} />
                      <Route path='/calendarform' element={<CalendarEntryForm/>} />
                  </Routes>
      </Router>
  )
}

export default App
