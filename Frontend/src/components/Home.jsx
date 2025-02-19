import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full pt-5 flex justify-between flex-col h-screen bg-blue-700'>
            <img className='w-20 pl-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='pb-4 bg-white py-4 px-6'>
            <h2 className='text-2xl font-bold'>Get Started with uber</h2>
            <Link to='/users/login' className='flex  justify-center w-full bg-black text-white py-3 rounded mt-3'>Continue</Link>
        </div>
        </div>
    </div>
  )
}

export default Home