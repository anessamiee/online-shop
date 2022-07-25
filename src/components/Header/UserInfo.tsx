import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import useAxios from '../../hooks/useAxios'
import { User } from '../../types/User'

const UserInfo: React.FC = () => {
  const { response, loading, error } = useAxios<User>({
    method: 'GET',
    url: '/users/1',
    responseType: 'json',
  })
  console.log('user remder')
  const name = response?.data.name.firstname

  return (
    <div className='flex items-center'>
      <BiUserCircle className='text-4xl' />
      <span className={`ml-2 text-2xl ${error && 'text-red-700'}`}>
        {loading && 'Loading...'}
        {error && error.code}
        {!loading && !error && 'Hi, ' + name}
      </span>
    </div>
  )
}

export default React.memo(UserInfo)
