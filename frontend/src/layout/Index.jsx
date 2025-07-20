import React from 'react'

const AuthLayouts = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center py-5'>
      <header className='flex justify-center items-center py-3 h-20 shadow-lg bg-gray-800 rounded-lg mb-4 w-full max-w-md border border-gray-700'>
        <div className='text-2xl font-bold text-white'>
          Chat App
        </div>
      </header>

      <div className='w-full max-w-md'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayouts
