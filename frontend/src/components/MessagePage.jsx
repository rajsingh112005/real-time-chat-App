import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import UploadFile from '../helpers/UploadFile';
import { IoClose } from "react-icons/io5";
import Loading from './Loading';
import { IoMdSend } from "react-icons/io";
import moment from 'moment'

const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  })
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })
  const [loading, setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([])
  const currentMessage = useRef()

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(prev => !prev)
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return;

    setLoading(true)
    try {
      const uploadPhoto = await UploadFile(file)
      if (uploadPhoto.url) {
        setMessage(prev => {
          return {
            ...prev,
            imageUrl: uploadPhoto.url
          }
        })
      } else {
        console.error('No URL in upload response:', uploadPhoto);
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please check your internet connection and try again.');
    } finally {
      setLoading(false)
      setOpenImageVideoUpload(false)
    }
  }

  const handleClearUploadImage = () => {
    setMessage(prev => {
      return {
        ...prev,
        imageUrl: ""
      }
    })
  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0]
    if (!file) return;

    setLoading(true)
    try {
      const uploadVideo = await UploadFile(file)
      if (uploadVideo.url) {
        setMessage(prev => {
          return {
            ...prev,
            videoUrl: uploadVideo.url
          }
        })
      } else {
        console.error('No URL in upload response:', uploadVideo);
        alert('Failed to upload video. Please try again.');
      }
    } catch (error) {
      console.error('Video upload failed:', error);
      alert('Failed to upload video. Please check your internet connection and try again.');
    } finally {
      setLoading(false)
      setOpenImageVideoUpload(false)
    }
  }

  const handleClearUploadVideo = () => {
    setMessage(prev => {
      return {
        ...prev,
        videoUrl: ""
      }
    })
  }

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.emit('seen', params.userId)

      socketConnection.on('message-user', (data) => {
        setDataUser(data)
      })

      socketConnection.on('message', (data) => {
        console.log('message data', data)
        setAllMessage(data)
      })
    }
  }, [socketConnection, params?.userId, user])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setMessage(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id
        })
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        })
      }
    }
  }

  return (
    <div className='h-full bg-cover  bg-centerbg-no-repeat' style={{ backgroundImage: 'url(/wallpaper.jpg)' }}>
      <header className='sticky top-0 h-16 bg-gray-800 flex justify-between items-center px-4 border-b border-gray-700'>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden text-gray-300 hover:text-white'>
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1 text-gray-200'>{dataUser?.name}</h3>
            <p className='-my-2 text-sm'>
              {
                dataUser.online ? <span className='text-green-500'>online</span> : <span className='text-white'>offline</span>
              }
            </p>
          </div>
        </div>

        <div>
          <button className='cursor-pointer hover:text-primary text-gray-300'>
            <HiDotsVertical />
          </button>
        </div>
      </header>

      {/***show all message */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar '>

        {/**all message show here */}
        <div className='flex flex-col gap-2 py-2 px-2 m-2' ref={currentMessage}>
          {
            allMessage.map((msg, index) => {
              return (
                <div key={index} className={`p-3 py-2 rounded-xl w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto mr-4 bg-green-600 self-end" : "mr-auto ml-4 bg-gray-600 self-start"}`}>
                  <div className='w-full relative'>
                    {
                      msg?.imageUrl && (
                        <img
                          src={msg?.imageUrl}
                          className='w-full h-full object-scale-down rounded'
                        />
                      )
                    }
                    {
                      msg?.videoUrl && (
                        <video
                          src={msg.videoUrl}
                          className='w-full h-full object-scale-down rounded'
                          controls
                        />
                      )
                    }
                  </div>
                  <p className={`px-2 py-2 ${user._id === msg?.msgByUserId ? "text-white" : "text-gray-200"}`}>{msg.text}</p>
                  <p className={`text-xs w-fit mt-2 px-2 ${user._id === msg?.msgByUserId ? "text-gray-200 ml-auto" : "text-gray-400 mr-auto"}`}>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>

        {/**upload Image display */}
        {
          message.imageUrl && (
            <div className='w-full h-full sticky bottom-0 bg-gray-900 bg-opacity-80 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-500 text-gray-300' onClick={handleClearUploadImage}>
                <IoClose size={30} />
              </div>
              <div className='bg-gray-800 p-3 rounded'>
                <img
                  src={message.imageUrl}
                  alt='uploadImage'
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }

        {/**upload video display */}
        {
          message.videoUrl && (
            <div className='w-full h-full sticky bottom-0 bg-gray-900 bg-opacity-80 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-500 text-gray-300' onClick={handleClearUploadVideo}>
                <IoClose size={30} />
              </div>
              <div className='bg-gray-800 p-3 rounded'>
                <video
                  src={message.videoUrl}
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                  controls
                  muted
                  autoPlay
                />
              </div>
            </div>
          )
        }

        {
          loading && (
            <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
              <Loading />
            </div>
          )
        }
      </section>

      {/**send message */}
      <section className='h-16 bg-gray-800 flex items-center px-6 py-2 border-t border-gray-700'>
        <div className='relative '>
          <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white text-gray-300'>
            <FaPlus size={20} />
          </button>

          {/**video and image */}
          {
            openImageVideoUpload && (
              <div className='bg-gray-700 shadow-lg rounded absolute bottom-14 w-36 p-2 border border-gray-600'>
                <form>
                  <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-gray-600 cursor-pointer rounded text-gray-200'>
                    <div className='text-primary'>
                      <FaImage size={18} />
                    </div>
                    <p>Image</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-gray-600 cursor-pointer rounded text-gray-200'>
                    <div className='text-purple-400'>
                      <FaVideo size={18} />
                    </div>
                    <p>Video</p>
                  </label>

                  <input
                    type='file'
                    id='uploadImage'
                    onChange={handleUploadImage}
                    className='hidden'
                  />

                  <input
                    type='file'
                    id='uploadVideo'
                    onChange={handleUploadVideo}
                    className='hidden'
                  />
                </form>
              </div>
            )
          }

        </div>

        {/**input box */}
        <form className='h-full w-full flex gap-3 items-center' onSubmit={handleSendMessage}>
          <input
            type='text'
            placeholder='Type here message...'
            className='py-3 px-4 outline-none w-full h-10 bg-gray-700 text-gray-200 placeholder-gray-400 rounded-lg'
            value={message.text}
            name='text'
            onChange={handleOnChange}
          />
          <button className='text-blue-500 hover:text-blue-400 p-2'>
            <IoMdSend size={28} />
          </button>
        </form>

      </section>
    </div>
  )
}

export default MessagePage
