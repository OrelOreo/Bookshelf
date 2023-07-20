<template>
    <div>
        <nav class="flex items-center justify-end bg-gray-800 p-4">
            <NuxtLink v-if="!authStore.userToken" class="text-white hover:text-gray-300 mr-2" to="/login">Login</NuxtLink>
            <NuxtLink v-if="!authStore.userToken" class="text-white hover:tqext-gray-300 mr-2" to="/signup">Sign up</NuxtLink>
            <p @click="logout" class="text-white hover:text-gray-300 cursor-pointer">Log out</p>
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