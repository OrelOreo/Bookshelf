import { defineStore } from "pinia";

interface Books {
    _id: string
    name: string
    userId: string
    username: string
    image: string
    description: string
    comments: Array<Object>
    note: number
}

export const useBooksStore = defineStore('booksStore', {
    state: () => ({
        books: [] as Books[],
    })
})