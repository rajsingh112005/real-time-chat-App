import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from '../redux/UserSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const user = useSelector(state => state.user)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [allUser, setAllUser] = useState([])
  const [openSearchUser, setOpenSearchUser] = useState(false)
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('sidebar', user._id)

      socketConnection.on('conversation', (data) => {
        console.log('conversation', data)

        const conversationUserData = data.map((conversationUser, index) => {
          if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender
            }
          }
          else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver
            }
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender
            }
          }
        })

        setAllUser(conversationUserData)
      })
    }
  }, [socketConnection, user])

  const handleLogout = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/logout`
      const response = await axios({
        url: URL,
        withCredentials: true
      })

      if (response.data.success) {
        dispatch(logout())
        navigate("/email")
        localStorage.clear()
        if (socketConnection) {
          socketConnection.disconnect()
        }
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Logout failed')
    }
  }

  return (
    <div className='h-full w-full flex bg-gray-800 gap-2'>
      <div className='bg-gray-700 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-gray-300 flex flex-col justify-between'>
        <div>
          <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-600 rounded ${isActive && "bg-gray-600"}`} title="Chat">
            <IoChatbubbleEllipses
              size={20}
            />
          </NavLink>

          <div title='add friend' onClick={() => setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-600 rounded'>
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-600 rounded' onClick={handleLogout}>
            <span className='-ml-2'>
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className='w-full bg-gray-800'>
        <div className='h-16 flex items-center'>
          <h2 className='text-xl font-bold p-4 text-gray-200'>Message</h2>
        </div>
        <div className='bg-gray-600 p-[0.5px]'></div>

        <div className=' h-[calc(100%-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
          {
            allUser.length === 0 && (
              <div className='mt-12'>
                <div className='flex justify-center items-center my-4 text-gray-400'>
                  <FiArrowUpLeft
                    size={50}
                  />
                </div>
                <p className='text-lg text-center text-gray-500'>Explore users to start a conversation with.</p>
              </div>
            )
          }

          {
            allUser.map((conv, index) => {
              return (
                <NavLink to={"/" + conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-gray-700 cursor-pointer'>
                  <div>
                    <Avatar
                      imageUrl={conv?.userDetails?.profile_pic}
                      name={conv?.userDetails?.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3 className='text-ellipsis line-clamp-1 font-semibold text-base text-gray-200'>{conv?.userDetails?.name}</h3>
                    <div className='text-gray-400 text-xs flex items-center gap-1'>
                      <div className='flex items-center gap-1'>
                        {
                          conv?.lastMsg?.imageUrl && (
                            <div className='flex items-center gap-1'>
                              <span><FaImage /></span>
                              {!conv?.lastMsg?.text && <span>Image</span>}
                            </div>
                          )
                        }
                        {
                          conv?.lastMsg?.videoUrl && (
                            <div className='flex items-center gap-1'>
                              <span><FaVideo /></span>
                              {!conv?.lastMsg?.text && <span>Video</span>}
                            </div>
                          )
                        }
                      </div>
                      <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                    </div>
                  </div>
                  {
                    Boolean(conv?.unseenMsg) && (
                      <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                    )
                  }

                </NavLink>
              )
            })
          }
        </div>
      </div>

      {/**edit user details*/}
      {
        editUserOpen && (
          <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
        )
      }

      {/**search user*/}
      {
        openSearchUser && (
          <SearchUser onClose={() => setOpenSearchUser(false)} />
        )
      }

    </div>
  )
}

export default Sidebar
