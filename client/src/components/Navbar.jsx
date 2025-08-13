import { Trophy } from 'lucide-react'
import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const linkClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-orange-500 pb-1"
      : "hover:border-b-2 hover:border-orange-500 pb-1";
  return (
    <div className='bg-gray-900 p-5 flex items-center justify-between'>
        <div className='flex items-center justify-center gap-3 !text-yellow-400'>
            <Trophy/>
            <h1 className='font-bold text-2xl'>Let's Play</h1>
        </div>
        <div className='text-white gap-10 flex items-center justify-center'>
          <NavLink to='/' className={linkClass}>
           Home
          </NavLink>
          <NavLink to='/tournaments' className={linkClass}>
            All Tournaments
          </NavLink>
          <NavLink to='/support' className={linkClass}>
            Support
          </NavLink>
          <NavLink to='/about' className={linkClass}>
            About
          </NavLink>
        </div>
        <div>
          <button onClick={()=>navigate('/login')} className='py-2 px-4 bg-orange-500 text-white font-bold rounded-2xl cursor-pointer'>Login</button>
        </div>
    </div>
  )
}

export default Navbar