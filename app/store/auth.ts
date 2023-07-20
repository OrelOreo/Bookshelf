import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        userId: '',
        username: '',
        userToken: '',
    }),
    actions: {
        pushUserInformations(id: string, name: string, token: string) {
            this.userId = id,
            this.username = name,
            this.userToken = token
        }
    }
})