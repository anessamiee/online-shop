import { AxiosError, AxiosResponse } from 'axios'

export type AxiosResults<T> = {
  response: AxiosResponse<T> | undefined
  error: AxiosError | undefined
  loading: boolean
}
