type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'

interface FetchResfulOptions {
  apiPath?: string | null
  token?: string | null
  method?: HttpMethod
  client?: boolean
  body?: any
}

interface FetchGraphOptions extends FetchResfulOptions {
  key?: string | undefined
  query?: string | null
  client?: boolean
  body?: any
}

const fetchGraph = async<T> ({
  key = undefined,
  apiPath = null,
  token = null,
  query = null,
  method = 'POST',
  client = true,
  body = null,
}: FetchGraphOptions) => {
  const config = useRuntimeConfig()

  let APP_API: string = (client ? config.public.APP_API : config.APP_API) as string

  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let fetchOptions = {
    method: method,
    headers: headers,
    key: key,
    body: JSON.stringify({ query }),
  }

  try {
    const { data, error } = await useFetch(APP_API, fetchOptions)

    if (error.value) {
      throw new Error(error.value?.message || 'Unknown error')
    }

    return {
      success: true,
      data: data.value as T,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

const fetchImg = (url: string) => {
  const config = useRuntimeConfig()

  if (import.meta.client) {
    return `${config.public.APP_URL}${url}`
  }
  return `${config.APP_URL}${url}`
}

const fetchRestful = async<T> ({ apiPath = null, token = null, method = 'GET', client = true, body = null }: FetchResfulOptions) => {
  const config = useRuntimeConfig()

  let APP_API: string = (client ? config.public.APP_API : config.APP_API) as string

  const apiUrl = apiPath ? `${APP_API}${apiPath}` : APP_API

  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let fetchOptions = {
    method: method,
    headers: headers,
    body: method !== 'GET' ? JSON.stringify(body) : null,
  }

  try {
    const { data, error } = await useFetch(apiUrl, fetchOptions)

    if (error.value) {
      throw new Error(error.value?.message || 'Unknown error')
    }

    return {
      success: true,
      data: data.value as T,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}
export { fetchImg, fetchGraph, fetchRestful }
