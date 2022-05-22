import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";

function App() {
  return (
      <Router>
              <Navbar/>
              <main className='container mx-auto '>
                  <Routes>
                      <Route path='/' element={
                              <>
                                  <Home/>
                              </>
                      }/>
                      <Route path='/home' element={<Home/>}/>
                      <Route path='/employee' element={<Employee/>} />
                  </Routes>
              </main>
      </Router>
  )
}

export default App
