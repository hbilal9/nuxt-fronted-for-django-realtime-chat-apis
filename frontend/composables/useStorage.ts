export function useStorage() {
    const setItem = (key: string, value: string) => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, value);
        }
    };
    const getItem = (key: string) => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key);
        }
    };
    const removeItem = (key: string) => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
        }
    };
    return { setItem, getItem, removeItem };
}