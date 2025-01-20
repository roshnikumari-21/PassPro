import React from 'react'

const Navbar = () => {
  return (
    <>
    
      <nav className='bg-gray-950 text-black p-4 flex justify-between items-center'>
      <div className="logo text-xl font-bold text-purple-400">#<span className='text-white'>Pass</span>PRO</div>
     
       
       <ul className='flex text-white'>      
        <li className='mx-2 hover:bg-gray-900'>Home</li>
        <li  className='mx-2 hover:bg-gray-900'>About</li>
        <li  className='mx-2 hover:bg-gray-900'>Contact</li>
        <li  className='mx-2 hover:bg-gray-900'>Services</li>
       </ul>
    </nav>
    </>
  )
}

export default Navbar
