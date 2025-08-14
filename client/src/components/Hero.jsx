import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className='h-[70vh] bg-gray-900 flex items-center justify-center flex-col text-white'>
        <h1 className='text-5xl font-bold'>Let's Play</h1>
        <h2 className='text-4xl font-bold mt-4'>Browse,Join,Conquer</h2>
        <h3 className='mt-4'>Join and win tournaments of games of your wish.</h3>
        <button onClick={()=>navigate('/tournaments')} className='p-4 mt-4 bg-orange-400 rounded-2xl font-semibold'>Browse Tournaments</button>
    </div>
  )
}

export default Hero