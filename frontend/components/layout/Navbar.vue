<script setup lang="ts">
import { TokensIcon } from '@radix-icons/vue'
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();

</script>
<template>
    <div class="h-12 w-full bg-slate-200 flex justify-between md:justify-end py-2">
        <div class="mr-2 md:hidden mx-2">
            <NuxtLink
                to="/"
                class="px-7 rounded cursor-pointer text-3xl font-bold flex items-center"
            >
                RealChat <TokensIcon class="h-7 w-7 mx-3" />
            </NuxtLink>
        </div> 
        <div class="mr-2">
            {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
        </div>
        <UiButton @click="authStore.logout">Logout</UiButton>
    </div>
</template>