import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T> (endpoint: string, options: UseFetchOptions<T> = {}, authRequired = true) {
    // const userAuth = useCookie('token')
    const storage = useStorage()
    const userAuth = storage.getItem('token')
    const baseURL = 'http://localhost:8000/api/'

    let headers = {}
    if (userAuth && authRequired) {
        headers = {
            Authorization: `Bearer ${userAuth}`,
        }
    }

    return useFetch(baseURL + endpoint, {
        // credentials: 'include',
        watch: false,
        ...options,
        headers: {
            ...options?.headers,
            ...headers,
        },
    })
}