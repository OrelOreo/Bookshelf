<template>
    <div>
        <form @submit.prevent="signup" class="flex flex-col justify-center items-center w-80 m-auto">
            <label for="username">Votre nom d'utilisateur</label>
            <input v-model="state.username" type="text" class="border border-blue-300 w-52" name="username" id="username">
            <label for="email">Votre email</label>
            <input v-model="state.email" class="border border-blue-300 w-52" type="email" name="email" id="email">
            <label for="password">Votre mot de passe</label>
            <input v-model="state.password" class="border border-blue-300 w-52" type="password" name="password" id="password">
            <button class="bg-gray-800 p-4 text-white hover:bg-gray-300 hover:text-gray-800 my-4 rounded-md">S'inscrire</button>
        </form>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

import { useRouter } from "vue-router"
import { reactive } from "vue"

const router = useRouter()
interface State {
    username: string
    email: string
    password: string
}

const state: State = reactive({
    username: '',
    email: '',
    password: ''
})

const signup = async () => {
    try {
        await $fetch(`${config.public.API_SERVER}/api/auth/signup`, {
            method: 'POST',
            body: {
                username: state.username,
                email: state.email,
                password: state.password
            }
        })
        router.replace('/login')
    } catch (error) {
        console.log(error)
    }
}

</script>