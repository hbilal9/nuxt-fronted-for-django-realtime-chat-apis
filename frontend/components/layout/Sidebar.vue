<script setup lang="ts">
</script>
<template>
    <div class="hidden md:flex  w-56justify-center bg-slate-200 h-screen text-white">
        <div class="flex flex-col w-full text-gray-800 space-y-2 font-bold pt-3">
            <NuxtLink
                to="/"
                class="px-7 rounded cursor-pointer text-3xl"
            >
                RealChat
            </NuxtLink>
            <NuxtLink
                to="/"
                class="px-7 py-3 rounded cursor-pointer hover:bg-slate-400"
                :exact-active-class="`text-gray-100 bg-gray-500`"
            >
                Home
            </NuxtLink>
            <NuxtLink
                to="/chats"
                class="px-7 py-3 rounded cursor-pointer hover:bg-slate-400"
                exact-active-class="text-gray-100 bg-gray-500"
            >
                Chats
            </NuxtLink>
        </div>
    </div>
</template>