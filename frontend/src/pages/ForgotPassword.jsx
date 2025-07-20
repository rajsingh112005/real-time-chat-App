import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // TODO: Implement forgot password functionality
    console.log('Forgot password for:', data.email)
  }

  return (
    <div className=' bg-gray-900 flex items-center justify-center py-5'>
      <div className='bg-gray-800 w-full max-w-md rounded overflow-hidden p-4 mx-auto border border-gray-700'>
        <h3 className='text-white text-xl font-semibold text-center'>Reset Password</h3>
        <p className='text-sm text-gray-300 mb-4 text-center'>Enter your email to reset password</p>

        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-gray-300'>Email :</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='enter your email'
              className='bg-gray-700 px-2 py-1 focus:outline-blue-500 text-white placeholder-gray-400 rounded'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-blue-600 text-lg px-4 py-1 hover:bg-blue-700 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Send Reset Link
          </button>
        </form>

        <p className='my-3 text-center text-gray-300'>
          Remember password ? <Link to={"/email"} className='hover:text-blue-400 font-semibold text-blue-500'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
