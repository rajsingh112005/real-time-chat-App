import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import UploadFile from '../helpers/UploadFile';
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/UserSlice'

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic
  })
  const uploadPhotoRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        name: user?.name,
        profile_pic: user?.profile_pic,
        email: user?.email
      }
    })
  }, [user])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault()
    e.stopPropagation()

    uploadPhotoRef.current.click()
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]

    const uploadPhoto = await UploadFile(file)

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/update-user`

      // Only send the fields we want to update
      const updateData = {
        name: data.name,
        profile_pic: data.profile_pic
      }

      const response = await axios({
        method: 'post',
        url: URL,
        data: updateData,
        withCredentials: true
      })

      console.log('response', response)
      toast.success(response?.data?.message)

      if (response.data.success) {
        dispatch(setUser(response.data.data))
        onClose()
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-10'>
      <div className='bg-gray-800 p-4 py-6 m-1 rounded w-full max-w-sm border border-gray-600'>
        <h2 className='font-semibold text-white'>Profile Details</h2>
        <p className='text-sm text-gray-300'>Edit user details</p>

        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-gray-300'>Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              value={data.name}
              onChange={handleOnChange}
              className='w-full py-1 px-2 focus:outline-blue-500 border border-gray-600 bg-gray-700 text-white rounded'
            />
          </div>

          <div>
            <div className='text-gray-300'>Photo:</div>
            <div className='my-1 flex items-center gap-4'>
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <label htmlFor='profile_pic'>
                <button className='font-semibold text-blue-500 hover:text-blue-400' onClick={handleOpenUploadPhoto}>Change Photo</button>
                <input
                  type='file'
                  id='profile_pic'
                  className='hidden'
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>

          <Divider />
          <div className='flex gap-2 w-fit ml-auto'>
            <button onClick={onClose} className='border-blue-500 border text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white'>Cancel</button>
            <button className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserDetails