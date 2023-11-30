import { defineStore } from 'pinia'
import type { IUser, ICredentials } from '~/types/auth';
import { useStorage } from '~/composables/useStorage';

interface ILogin {
    access_token: string;
    user: IUser;
}

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isLoggedIn: false,
            user: null || {} as IUser,
        }
    },

    actions : {
        async login(body: ICredentials) {
            let cookie = useStorage();
            const { data, pending, error  } = await useApiFetch<ILogin>('auth/login/', {
                method: 'POST',
                body: body
            });
            
            if (data.value) {
                this.isLoggedIn = true;
                this.user = data.value?.user;
                // cookie.value = data.value?.access_token;
                cookie.setItem('token', data.value?.access_token);
            }

            return { data, pending, error };
        },

        async getProfile() {
            const { data, pending, error } = await useApiFetch<IUser>('auth/profile/');
            if (data.value) {
                this.isLoggedIn = true;
                this.user = data.value;
            }

            return { data, pending, error };
        },

        setUser (user: IUser) {
            this.user = user;
        },

        logout () {
            let storage = useStorage();
            storage.removeItem('token');
            this.isLoggedIn = false;
            this.user = null || {} as IUser;
            useCookie('token').value = null;
            return navigateTo('/auth/login')
        },
    }
});