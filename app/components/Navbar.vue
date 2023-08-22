<template>
    <div>
        <nav class="flex items-center justify-end bg-gray-800 p-4 relative">
            <NuxtLink class="absolute left-6 top-3.5 text-white font-serif text-xl cursor-pointer" to="/">Bookshelf</NuxtLink>
            <NuxtLink v-if="!authStore.userToken" class="text-white hover:text-gray-300 mr-2" to="/login">Se connecter</NuxtLink>
            <NuxtLink v-if="!authStore.userToken" class="text-white hover:text-gray-300 mr-2" to="/signup">S'inscrire</NuxtLink>
            <NuxtLink v-if="authStore.userToken" class="text-white hover:text-gray-300 mr-2 cursor-pointer" to="/favoris">Favoris</NuxtLink>
            <button v-if="authStore.userToken" @click="logout" class="text-white hover:text-gray-300 cursor-pointer">Deconnexion</button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()

const logout = () => {
    localStorage.removeItem('token')
    authStore.userId = ''
    authStore.userToken = ''
    authStore.username = ''
} 

</script>