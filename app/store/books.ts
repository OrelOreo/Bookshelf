import { defineStore } from "pinia";

interface Comment {
    username: string
    comment: string
    createdAt: string
    updatedAt: string
}
interface Book {
    _id: string
    name: string
    userId: string
    username: string
    image: string
    description: string
    category: string
    comments: Array<Comment>
    note: number
    createdAt: string
    updatedAt: string
}

export const useBooksStore = defineStore('booksStore', {
    state: () => ({
        books: [] as Book[],
    }),

    actions: {
        postBook(book: Book) {
            this.books.push(book)
        },
        updateBook(index: number, nbToDelete: number, updatedBook: Book) {
            this.books.splice(index, nbToDelete, updatedBook)
        }
    }
})