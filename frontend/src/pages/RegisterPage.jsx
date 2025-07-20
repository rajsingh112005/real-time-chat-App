import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import UploadFile from '../helpers/UploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })
  const [uploadPhoto, setUploadPhoto] = useState("")
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

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]

    const uploadPhoto = await UploadFile(file)

    setUploadPhoto(file)

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url
      }
    })
  }

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
    setData((preve) => {
      return {
        ...preve,
        profile_pic: ""
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/register`

    try {
      const response = await axios.post(URL, data)
      console.log("response", response)

      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })

        navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    console.log('data', data)
  }

  return (
    <div className=' bg-gray-900 flex items-center justify-center py-5'>
      <div className='bg-gray-800 w-full max-w-md rounded overflow-hidden p-4 mx-auto border border-gray-700'>
        <h3 className='text-white text-xl font-semibold text-center'>Welcome to My Chat app!</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-gray-300'>Name :</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='enter your name'
              className='bg-gray-700 px-2 py-1 focus:outline-blue-500 text-white placeholder-gray-400 rounded'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

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

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic' className='text-gray-300'>Photo :

              <div className='h-14 bg-gray-700 flex justify-center items-center border border-gray-600 rounded hover:border-blue-500 cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1 text-gray-300'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-red-500 text-gray-300' onClick={handleClearUploadPhoto}>
                      <IoClose />
                    </button>
                  )
                }

              </div>

            </label>

            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-gray-700 px-2 py-1 focus:outline-blue-500 hidden'
              onChange={handleUploadPhoto}
            />
          </div>

          <button
            className='bg-blue-600 text-lg px-4 py-1 hover:bg-blue-700 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Register
          </button>

        </form>

        <p className='my-3 text-center text-gray-300'>Already have account ? <Link to={"/email"} className='hover:text-blue-400 font-semibold text-blue-500'>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage