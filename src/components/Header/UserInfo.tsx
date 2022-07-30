import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { GetSingleUser } from '../../api/users'
import LoadingSpinner from '../UI/LoadingSpinner'

const UserInfo: React.FC = () => {
  const { response, loading, error } = GetSingleUser(1)
  const name = response?.data.name.firstname

  return (
    <div className='flex items-center'>
      <BiUserCircle className='text-4xl' />
      <span className={`ml-2 text-2xl ${error && 'text-red-700'}`}>
        {loading && <LoadingSpinner />}
        {error && error.code}
        {!loading && !error && 'Hi, ' + name}
      </span>
    </div>
  )
}

export default React.memo(UserInfo)
