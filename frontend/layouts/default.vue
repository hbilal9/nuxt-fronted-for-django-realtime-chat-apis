<script setup lang="ts">
</script>
<template>
    <div class="w-full h-screen">
        <div class="flex">
            <LayoutSidebar />
            <div class="w-full">
                <LayoutNavbar />
                <div class="mx-4">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>