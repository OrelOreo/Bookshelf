<template>
  <div>
    <div
      v-if="book"
      class="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden border border-gray-300 relative"
    >
      <img
        :src="`${book.image}`"
        alt="uwu"
        class="w-full h-40 object-cover object-center"
      />
      <div class="p-4">
        <h2 class="text-xl font-bold mb-2">{{ book.name }}</h2>
        <p class="text-gray-700 mb-4">{{ book.description }}</p>
        <p class="text-gray-500 text-sm">{{ book.category }}</p>
      </div>
      <div class="flex mb-1 ml-1">
        <img v-for="n in book.note" :key="n" src="~/assets/star-fill.png" alt="rating image">
      </div>
      <button
        v-if="isItGoodUser"
        @click="isFormModalOpen = true"
        class="absolute bottom-1 right-14 w-10 h-10 border border-gray-400"
      >
        EDIT
      </button>
      <button
        v-if="isItGoodUser"
        @click="deleteBook"
        class="absolute bottom-1 right-1 w-10 h-10 bg-red-600 text-white"
      >
        X
      </button>
    </div>
    <form
      @submit.prevent="postCommentary"
      class="max-w-md mx-auto bg-white shadow-md rounded-md p-6"
    >
      <div class="mb-4">
        <label for="commentary" class="block text-gray-700 font-bold mb-2"
          >Ajouter un commentaire à ce livre:</label
        >
        <input
          v-model="bookCommentary"
          type="text"
          id="commentary"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button class="bg-gray-800 p-4 text-white hover:bg-gray-300 hover:text-gray-800 block m-auto my-4 rounded-md">Ajouter</button>
    </form>
    <div v-if="bookStore.books[indexBook].comments.length > 0" class="max-w-md mx-auto bg-white shadow-md rounded-md p-6 m-4">
      <div class="py-2 mb-2" v-for="comment in bookStore.books[indexBook].comments">
        <p><span class="font-bold">{{ comment.username }} : </span>{{ comment.comment }}</p>
      </div>
    </div>

    <AddBookForm :idObject="route.params.id" v-if="isFormModalOpen" />
  </div>
</template>

<script setup lang="ts">
import { useIsFormModalOpen } from "~/composables/state";
import { useAuthStore } from '~/store/auth';
import { useBooksStore } from "~/store/books";
import { ref, onMounted } from 'vue'
import { useRouter, useRoute  } from "vue-router"

const config = useRuntimeConfig()

const bookStore = useBooksStore();
const authStore = useAuthStore()
const isFormModalOpen = useIsFormModalOpen();
const route = useRoute();
const router = useRouter()

const book = ref(null);
const bookCommentary = ref(null);

const token = authStore.userToken
const id = authStore.userId

const indexBook: number = bookStore.books.findIndex(b => b._id === route.params.id)

const isItGoodUser = () => {
  return id === book.userId ? true : false;
};

async function fetchBook() {
  const data = await fetch(
    `${config.public.API_SERVER}/api/books/${route.params.id}`
  );
  book.value = await data.json();
}

const deleteBook = async () => {
  try {
    await $fetch(
      `${config.public.API_SERVER}/api/books/${route.params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    bookStore.books.splice(indexBook, 1)
    router.replace('/')
  } catch (error) {
    console.log(error);
  }
};

const postCommentary = async () => {
  try {
    if (!bookCommentary.value) {
      return
    }
    const requestBody = {
      username: authStore.username,
      comment: bookCommentary.value,
    };
    await $fetch(
      `${config.public.API_SERVER}/api/books/${route.params.id}/commentary`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: requestBody,
      }
    );
    bookStore.books[indexBook].comments.push(requestBody)
    bookCommentary.value = "";
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchBook);
</script>
