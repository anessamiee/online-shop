import useAxios from '../hooks/useAxios'

export const GetAllCategories = () => {
  const { response, error, loading } = useAxios<string[]>({
    method: 'GET',
    url: '/products/categories',
    responseType: 'json',
  })
  return { response, error, loading }
}
export const GetSingleCategory = (category: string) => {
  const { response, error, loading } = useAxios<string>({
    method: 'GET',
    url: `/products/category/${category}`,
    responseType: 'json',
  })
  return { response, error, loading }
}
