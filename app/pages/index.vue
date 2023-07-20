<template>
    <div>
      <h1 class="text-center text-2xl">Les books !</h1>
      <button @click="isFormModalOpen = true" class="bg-gray-800 p-4 text-white hover:bg-gray-300 hover:text-gray-800 block m-auto my-4 rounded-md">Ajouter un book</button>
      <AddBookForm v-if="isFormModalOpen" />
        <div class="z-10" v-if="bookStore.books" v-for="book in bookStore.books">
          <Card :book="book" />
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from "vue"
  import { useBooksStore } from "~/store/books";
  import { useIsFormModalOpen } from "~/composables/state";

  const config = useRuntimeConfig()
  const bookStore = useBooksStore()
  const isFormModalOpen = useIsFormModalOpen()

  
  async function fetchBooks() {
    const data = await fetch(`${config.public.API_SERVER}/api/books`);
    bookStore.books = await data.json();
  }
  
  onMounted(fetchBooks);
  </script>
  