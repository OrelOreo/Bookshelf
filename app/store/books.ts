import { defineStore } from "pinia";
import IBook from "~/types/Interfaces/Book"

export const useBooksStore = defineStore('booksStore', {
    state: () => ({
        books: [] as IBook[],
    }),

    actions: {
        postBook(book: IBook) {
            this.books.push(book)
        },
        updateBook(index: number, nbToDelete: number, updatedBook: IBook) {
            this.books.splice(index, nbToDelete, updatedBook)
        }
    }
})