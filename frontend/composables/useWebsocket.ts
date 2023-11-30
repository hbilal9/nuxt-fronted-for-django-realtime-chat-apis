function useWebsocket(endpoint: string) {
    return new WebSocket(`ws://localhost:8000/ws/${endpoint}`)
}

export default useWebsocket;