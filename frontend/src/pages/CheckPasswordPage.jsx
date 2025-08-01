import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/UserSlice';

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email')
    }
  }, [])

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

    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/password`

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true
      })

      toast.success(response.data.message)

      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)

        setData({
          password: "",
        })
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className=' bg-gray-900 flex items-center justify-center py-5'>
      <div className='bg-gray-800 w-full max-w-md rounded overflow-hidden p-4 mx-auto border border-gray-700'>

        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1 text-white'>{location?.state?.name}</h2>
        </div>

        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password' className='text-gray-300'>Password :</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='enter your password'
              className='bg-gray-700 px-2 py-1 focus:outline-blue-500 text-white placeholder-gray-400 rounded'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-blue-600 text-lg px-4 py-1 hover:bg-blue-700 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Login
          </button>

        </form>

        <p className='my-3 text-center'>
          <Link to={"/forgot-password"} className='hover:text-blue-400 font-semibold text-blue-500'>
            Forgot password ?
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CheckPasswordPage