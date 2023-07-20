<template>
    <div>
        <form @submit.prevent="login" class="flex flex-col justify-center items-center w-80 m-auto">
            <label for="email">Votre email</label>
            <input v-model="state.email" class="border border-blue-300 w-52" type="email" name="email" id="email">
            <label for="password">Votre mot de passe</label>
            <input v-model="state.password" class="border border-blue-300 w-52" type="password" name="password" id="password">
            <button class="bg-gray-800 p-4 text-white hover:bg-gray-300 hover:text-gray-800 my-4 rounded-md">Se connecter</button>
        </form>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
const config = useRuntimeConfig()

const authStore = useAuthStore()
const router = useRouter()
const tokenCookie = useCookie('tokenCookie')

const state = reactive({
    email: '',
    password: ''
})
const login = async () => {
    try {
        const response = await $fetch(`${config.public.API_SERVER}/api/auth/login`, {
            method: 'POST',
            body: {
                email: state.email,
                password: state.password
            }
        })
        tokenCookie.value = response.token
        authStore.pushUserInformations(response.userId, response.username, response.token)
        router.replace('/')
    } catch (error) {
        console.log(error)
    }
}

</script>