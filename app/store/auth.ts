import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        userId: '',
        username: '',
        userToken: '',
        userImage: ''
    }),
    actions: {
         pushUserInformations(id: string, name: string, token: string, image: string) {
            this.userId = id,
            this.username = name,
            this.userToken = token
            this.userImage = image
        },
        initializePersistedData() {
            this.userToken = localStorage.getItem('userToken') ?? ''
            this.userId = localStorage.getItem('userId') ?? ''
            this.username = localStorage.getItem('username') ?? ''
            this.userImage = localStorage.getItem('userImage') ?? ''
        }
    },
})