<template>
    <div class="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
        <NuxtLink :to="`${props.book._id}`">
            <img :src="`${props.book.image}`" alt="uwu" class="w-full h-40 object-cover object-center">
            <div class="p-4">
                <h2 class="text-xl font-bold mb-2">{{ props.book.name }}</h2>
                <p class="text-gray-700 mb-4">{{ props.book.description }}</p>
                <p class="text-gray-500 text-sm">{{ props.book.category }}</p>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    book: { type: Object }
})
</script>