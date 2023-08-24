<template>
  <div class="relative">
    <h1 class="text-center text-5xl mt-4">Les livres</h1>
    <button
      @click="isFormModalOpen = true"
      class="bg-[#8075FF] hover:bg-[#6356f1] p-4 text-white font-semibold block m-auto my-4 rounded-md"
    >
      Ajouter un livre
    </button>
    <div class="flex flex-wrap w-4/5 justify-center m-auto">
        <Card v-if="bookStore.books" v-for="book in bookStore.books" :book="book" class="mx-4" />
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
