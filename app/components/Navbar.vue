<template>
    <header class="bg-gray-800 p-4 h-16">
        <nav class="flex items-center">
            <NuxtLink to="/" class="text-white text-xl font-serif cursor-pointer">Bookshelf</NuxtLink>
            <div class="ml-auto mr-4">
                <NuxtLink v-if="!authStore.userToken" to="/login" class="font-semibold bg-gray-50 py-3 px-4 rounded-xl hover:bg-gray-100 mr-2">Se connecter</NuxtLink>
                <NuxtLink v-if="!authStore.userToken" to="/signup" class="text-white font-semibold py-3 px-4 rounded-xl bg-[#8075FF] hover:bg-[#6356f1] ">S'inscrire</NuxtLink>
                <NuxtLink v-if="authStore.userToken" to="/favoris" class="text-white mr-4">Favoris</NuxtLink>
                <NuxtLink v-if="authStore.userToken" @click="logout" class="text-white py-3 px-4 rounded-xl font-semibold cursor-pointer bg-[#8075FF] hover:bg-[#6356f1]">Deconnexion</NuxtLink>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()

const logout = () => {
    const dataInStorageToRemove = ['userToken', 'userId', 'username']

    dataInStorageToRemove.forEach(data => {
        localStorage.removeItem(data)
        authStore[data] = ''
    })
} 

</script>