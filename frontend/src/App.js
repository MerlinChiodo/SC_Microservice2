import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import NewsletterForm from "./pages/NewsletterForm"
import CalendarEntryForm from "./pages/CalendarEntryForm";
import AboutUsForm from "./pages/AboutUsForm";
import Inquiries from "./pages/Inquiries";
import {RouteProvider} from "./context/route/RouteContext";
import DisplayTickets from "./pages/DisplayTickets";
import Tickets from "./pages/Tickets";
import {UserProvider} from "./context/user/UserContext";
import Login from "./pages/Login";



function App() {
  return (
      <RouteProvider>
      <UserProvider>
      <Router>

              <Navbar>

                  <Routes>
                      <Route path='/' element={
                              <>
                                  <Home/>
                              </>
                      }/>
                      <Route path='/employee' element={<Employee/>} />
                      <Route path='/articleform' element={<NewsletterForm/>} />
                      <Route path='/calendarform' element={<CalendarEntryForm/>} />
                      <Route path='/aboutusform' element={<AboutUsForm/>}/>
                      <Route path='/inquiries' element={<Inquiries/>}/>
                      <Route path='/ticket' element={<DisplayTickets/>}/>
                      <Route path='/tickets' element={<Tickets/>}/>
                      <Route path='/login' element={<Login/>}/>
                  </Routes>
              </Navbar>
      </Router>
      </UserProvider>
      </RouteProvider>

  )
}

export default App
