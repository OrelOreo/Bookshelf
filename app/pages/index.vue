<template>
  <div class="relative">
    <h1 class="text-center text-5xl">The books</h1>
    <button
      @click="isFormModalOpen = true"
      class="bg-gray-800 p-4 text-white hover:bg-gray-300 hover:text-gray-800 block m-auto my-4 rounded-md"
    >
      Ajouter un book
    </button>
    <div
      class="flex flex-col items-center"
      v-if="bookStore.books"
      v-for="book in bookStore.books"
    >
      <Card :book="book" />
    </div>
    <div
      v-if="isFormModalOpen"
      class="fixed bottom-0 left-0 top-0 right-0 h-full z-30 bg-black opacity-60"
    />
    <div
      v-if="isFormModalOpen"
      class="fixed bottom-0 left-0 top-0 right-0 h-full w-full z-40 translate-y-[20%]"
    >
      <AddBookForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useBooksStore } from "~/store/books";
import { useIsFormModalOpen } from "~/composables/state";
import AddBookForm from "~/components/AddBookForm.vue";

const config = useRuntimeConfig();
const bookStore = useBooksStore();
const isFormModalOpen = useIsFormModalOpen();

async function fetchBooks() {
  const data = await fetch(`${config.public.API_SERVER}/api/books`);
  bookStore.books = await data.json();
}

onMounted(fetchBooks);
</script>
