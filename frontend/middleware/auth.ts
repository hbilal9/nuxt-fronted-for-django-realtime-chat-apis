import { useAuthStore } from "~/stores/useAuthStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
    let authStore = useAuthStore()
    let { isLoggedIn } = authStore
    // const token = useCookie('token')
    const storage = useStorage()
    const token = storage.getItem('token')

    if (to.path == '/' && !token) {
        return navigateTo('/auth/login');
    }

    if (isLoggedIn && to.path == '/') {
        return navigateTo(`/`, { redirectCode: 301 });
    }

    if (to.name == 'id-create-issue') {
        return;
    }

    if (to.name == 'id-close-issue') {
        return;
    }

    if (to.name == 'auth-reset-password-id-token') {
        return;
    }

    // if (to.name == 'id-create-issue' && to.path !== from.path) {
    //     if(from.path !== to.path) {return}
    //     return navigateTo(to.path, { replace: false });
    // }

    if (token && !isLoggedIn) {
        const { error } = await authStore.getProfile()
        if (error.value) {
            authStore.logout()
        }
    }
    if (process.server) {
        if (!token && to.path !== '/auth/login') {
            return navigateTo('/auth/login', { replace: true })
        }
    }
    else{
        if (isLoggedIn && to.path === '/auth/login') {
            return navigateTo('/company')
        }

        if (!token && to.path !== '/auth/login') {
            return navigateTo('/auth/login', { replace: true })
        }
    }

})