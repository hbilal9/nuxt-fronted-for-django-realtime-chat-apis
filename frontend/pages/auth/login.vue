<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import { useCommonStore } from '@/stores/useCommonStore';
import type { ICredentials } from '~/types/auth';

const authStore = useAuthStore();
const commonStore = useCommonStore();
let cookie = useStorage();

const user = reactive<ICredentials>({} as ICredentials)

const errors = ref<{
    message: string
    email: [string],
    password: [string]
}>();
onMounted(() => {
})
let st = cookie.getItem('token')
if(st) navigateTo(`/chats`)

const handleLogin = async() => {
    commonStore.isLoading = true
    const {data, pending, error } = await authStore.login(user)
    commonStore.isLoading = false

    if(data?.value) navigateTo(`/chats`)

    // console.log('data', data)
    if(error.value){
        errors.value = {
            message: error.value?.data?.message,
            email: error.value?.data?.errors?.email,
            password: error.value?.data?.errors?.password
        }
    }
}

definePageMeta({
	layout: false,
});
</script>

<template>
    <div class="flex justify-center h-screen items-center">
        <UiCard class="min-w-[400px] min-h-[500px] flex flex-col justify-center items-center">
            <UiCardHeader>
                <UiCardTitle class="text-center text-4xl">Login</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="flex flex-col space-y-2 w-full">
                <UiLabel for="email">Email</UiLabel>
                <UiInput v-model="user.email" class="p-5 text-md" id="email" placeholder="Email" />

                <UiLabel for="password">Password</UiLabel>
                <UiInput
                    v-model="user.password"
                    id="password"
                    class="p-5 text-md"
                    placeholder="Password"
                    type="password"
                    @keyup.enter="user.email !== '' && user.password !== '' && handleLogin"
                />

                <UiButton
                    @click="handleLogin"
                    class="mt-6 self-center px-8 py-5"
                    variant="default"
                >
                    Login
                </UiButton>

                <UiAlert v-if="errors?.message" class="mt-5" variant="destructive">{{ errors?.message }}</UiAlert>
            </UiCardContent>
        </UiCard>
    </div>
</template>