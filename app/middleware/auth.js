import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthStore()
    if (user.userToken === '') {
        return navigateTo('/login')
    }
})