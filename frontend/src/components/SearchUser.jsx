import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast'
import axios from 'axios';
import { IoClose } from "react-icons/io5";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const handleSearchUser = async () => {
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/search-user`
    try {
      setLoading(true)
      const response = await axios.post(URL, {
        search: search
      })
      setLoading(false)

      setSearchUser(response.data.data)

    } catch (error) {
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (search.trim()) {
      handleSearchUser()
    } else {
      setSearchUser([])
    }
  }, [search])

  console.log("searchUser", searchUser)

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-70 p-2 z-10'>
      <div className='w-full max-w-lg mx-auto mt-10'>
        {/**input search user */}
        <div className='bg-gray-800 rounded h-14 overflow-hidden flex border border-gray-600'>
          <input
            type='text'
            placeholder='Search user by name, email....'
            className='w-full outline-none py-1 h-full px-4 bg-gray-800 text-white placeholder-gray-400'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className='h-14 w-14 flex justify-center items-center text-gray-400'>
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/**display search user */}
        <div className='bg-gray-800 mt-2 w-full p-4 rounded border border-gray-600'>
          {/**no user found */}
          {
            searchUser.length === 0 && !loading && search.trim() && (
              <p className='text-center text-gray-400'>No user found!</p>
            )
          }

          {
            searchUser.length === 0 && !loading && !search.trim() && (
              <p className='text-center text-gray-400'>Search for users</p>
            )
          }

          {
            loading && (
              <p><Loading /></p>
            )
          }

          {
            searchUser.length !== 0 && !loading && (
              searchUser.map((user, index) => {
                return (
                  <UserSearchCard key={user._id} user={user} onClose={onClose} />
                )
              })
            )
          }
        </div>
      </div>

      <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white text-gray-300' onClick={onClose}>
        <button>
          <IoClose />
        </button>
      </div>
    </div>
  )
}

export default SearchUser