export default class useHttp {
    public static get(endpoint: string, options?: any, authRequired = true) {
        return useApiFetch(endpoint, {
            method: 'GET',
            ...options,
        },
        authRequired
        )
    }

    public static post(endpoint: string, body: any, authRequired = true): Promise<any>{
        return useApiFetch(endpoint, {
            method: 'POST',
            body: body,
        }, authRequired)
    }

    public static put(endpoint: string, body: BodyInit): Promise<any>{
        return useApiFetch(endpoint, {
            method: 'PUT',
            body: body,
        })
    }

    public static delete(endpoint: string): Promise<any>{
        return useApiFetch(endpoint, {
            method: 'DELETE'
        })
    }
}