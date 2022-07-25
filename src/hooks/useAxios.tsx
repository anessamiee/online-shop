import { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = 'https://fakestoreapi.com'

function useAxios<T>(axiosParams: AxiosRequestConfig) {
  const [response, setResponse] = useState<AxiosResponse<T>>()
  const [error, setError] = useState<AxiosError>()
  const [loading, setLoading] = useState(true)

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params)
      if (result.data === null) {
        new AxiosError()
        const error = new AxiosError()
        error.code = 'ERR_BAD_REQUEST'
        error.message = 'Request failed with status code 404'
        throw error
      } else {
        setResponse(result)
      }
    } catch (err) {
      const error = err as AxiosError
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(axiosParams)
  }, [])

  return { response, error, loading }
}

export default useAxios
