import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/email`

    try {
      const response = await axios.post(URL, data)

      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          email: "",
        })
        navigate('/password', {
          state: response?.data?.data
        })
      }
    } catch (error) {
      console.log('Error details:', error.response?.data || error.message)
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className=' bg-gray-900 flex items-center justify-center py-5'>
      <div className='bg-gray-800 w-full max-w-md rounded overflow-hidden p-4 mx-auto border border-gray-700'>

        <div className='w-fit mx-auto mb-2'>
          <PiUserCircle
            size={80}
            className='text-gray-300'
          />
        </div>

        <h3 className='text-white text-xl font-semibold text-center'>Welcome to Chat app!</h3>

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
            Let's Go
          </button>

        </form>

        <p className='my-3 text-center text-gray-300'>New User ? <Link to={"/register"} className='hover:text-blue-400 font-semibold text-blue-500'>Register</Link></p>
      </div>
    </div>
  )
}

export default CheckEmailPage