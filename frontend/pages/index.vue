<script setup lang="ts">
    const user = ref({ name: '' })

    definePageMeta({
        middleware: 'auth',
    });
</script>

<template>
    <div>
        <h1 class="text-3xl text-red-500">Hello World - {{ user.name }}</h1>
        <UiButton variant="default">Click me</UiButton>
        <UiInput class="mt-3 mx-5" v-model="user.name" placeholder="Enter your name" />

    </div>
</template>