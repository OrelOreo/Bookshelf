<template>
    <div>
        <nav class="flex items-center justify-end bg-gray-800 p-4 relative">
            <NuxtLink class="absolute left-6 top-3.5 text-white font-serif text-xl cursor-pointer" to="/">Bookshelf</NuxtLink>
            <NuxtLink v-if="!authStore.userToken" class="text-white hover:text-gray-300 mr-2" to="/login">Login</NuxtLink>
            <NuxtLink v-if="!authStore.userToken" class="text-white hover:text-gray-300 mr-2" to="/signup">Sign up</NuxtLink>
            <button @click="logout" class="text-white hover:text-gray-300 cursor-pointer">Log out</button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()

const tokenCookie = useCookie('tokenCookie')

const logout = () => {
    tokenCookie.value = null
    authStore.userId = null
    authStore.userToken = null
    authStore.username = null
} 


</script>