import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({ user, onClose }) => {
  return (
    <Link to={"/" + user?._id} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-gray-600 hover:border hover:border-blue-500 rounded cursor-pointer hover:bg-gray-700'>
      <div>
        <Avatar
          width={50}
          height={50}
          name={user?.name}
          userId={user?._id}
          imageUrl={user?.profile_pic}
        />
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1 text-white'>
          {user?.name}
        </div>
        <p className='text-sm text-ellipsis line-clamp-1 text-gray-400'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserSearchCard
