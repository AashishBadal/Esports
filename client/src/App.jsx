import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
  import { ToastContainer } from 'react-toastify';
import Tournaments from './pages/Tournaments';
import Support from './pages/Support';
import About from './pages/About';

const App = () => {
  return (
    <div className='bg-gray-900'>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/tournaments' element={<Tournaments/>}/>
        <Route path='/support' element={<Support/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App