import useAxios from '../hooks/useAxios'
import { User } from '../types/User'

export const GetAllUsers = () => {
  const { response, error, loading } = useAxios<User[]>({
    method: 'GET',
    url: '/users/',
    responseType: 'json',
  })
  return { response, error, loading }
}
export const GetSingleUser = (userID: number) => {
  const { response, error, loading } = useAxios<User>({
    method: 'GET',
    url: `/users/${userID}`,
    responseType: 'json',
  })
  return { response, error, loading }
}
