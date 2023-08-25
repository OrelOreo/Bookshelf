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
        },
        initializePersistedData() {
            this.userToken = localStorage.getItem('userToken') ?? ''
            this.userId = localStorage.getItem('userId') ?? ''
            this.username = localStorage.getItem('username') ?? ''
        }
    },
})