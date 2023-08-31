<template>
  <div>
    <div
      v-if="book"
      class="w-1/5 mx-auto mt-5 border rounded-lg shadow bg-gray-800 border-gray-700 relative"
    >
      <img
        class="rounded-t-lg object-cover h-60 w-full"
        :src="`${book.image}`"
        alt="livre"
      />

      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ book.name }}
        </h5>
        <p class="mb-3 text-gray-400">
          {{ book.description }}
        </p>
        <p class="mb-3 text-gray-400">
          {{ book.category }}
        </p>
        <p class="text-gray-400">{{ bookCreatedDate }}</p>
      </div>
      <div class="w-full flex justify-between items-center p-5">
        <div class="flex">
          <img
            v-for="n in book.note"
            :key="n"
            src="~/assets/star.png"
            alt="rating star"
            class="h-5 w-5 mr-1"
          />
        </div>
        <div v-if="book.userId === id">
          <button
            @click="isFormModalOpen = true"
            class="focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 bg-gray-800 text-white border border-[#8075FF] hover:bg-[#6356f1] hover:border-[#6356f1] focus:[#6356f1] mr-2"
          >
            Modifier
          </button>
          <button
            @click="deleteBook"
            class="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
          >
            X
          </button>
        </div>
      </div>
    </div>
    <button @click="addToFavorites" class="bg-[#8075FF] hover:bg-[#6356f1] rounded-xl py-3 px-4 text-white block mx-auto mt-4">Ajouter ce livre dans mes favoris</button>
    <div
      v-if="isFormModalOpen"
      class="fixed bottom-0 left-0 top-0 right-0 h-full z-30 bg-black opacity-60"
    />
    <div
      v-if="isFormModalOpen"
      class="fixed bottom-0 left-0 top-0 right-0 h-full w-full z-40 translate-y-[20%]"
    >
      <AddBookForm :idObject="route.params.id" />
    </div>
    <div
      class="w-1/5 mx-auto mt-5"
      v-if="bookStore.books[indexBook].comments.length > 0"
    >
      <h3 class="font-bold mb-2">
        Commentaires ({{ bookStore.books[indexBook].comments.length }}) :
      </h3>
      <div
        class="bg-gray-700 rounded-lg p-3 mb-2"
        v-for="comment in bookStore.books[indexBook].comments"
      >
        <h3 class="font-bold text-white">
          {{ comment.username }}
          <span class="text-gray-400">{{ comment.createdAt }}</span>
        </h3>
        <p class="text-gray-300">{{ comment.comment }} !</p>
      </div>
    </div>
    <form @submit.prevent="postCommentary" class="w-1/5 mx-auto mt-5">
      <label
        for="commentaire"
        class="block mb-2 text-sm font-medium text-gray-900"
        >Ton message</label
      >
      <textarea
        v-model="bookCommentary"
        id="commentaire"
        rows="4"
        class="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
        placeholder="Laisse un commentaire..."
      ></textarea>
      <button
        type="submit"
        class="text-white bg-gray-700 hover:bg-gray-600 border-gray-700 py-2 px-4 mt-1 rounded-md block ml-auto"
      >
        Enregistrer
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useIsFormModalOpen } from "~/composables/state";
import { useAuthStore } from "~/store/auth";
import { useBooksStore } from "~/store/books";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const config = useRuntimeConfig();

const bookStore = useBooksStore();
const authStore = useAuthStore();
const isFormModalOpen = useIsFormModalOpen();
const route = useRoute();
const router = useRouter();

const book = ref(null);
let bookCreatedDate: string;
// let commentCreatedDate: string;

const bookCommentary = ref(null);

const token = authStore.userToken;
const id = authStore.userId;

const indexBook: number = bookStore.books.findIndex(
  (b) => b._id === route.params.id
);

async function fetchBook() {
  const data = await fetch(
    `${config.public.API_SERVER}/api/books/${route.params.id}`
  );
  book.value = await data.json();
  bookCreatedDate = new Date(book.value.createdAt).toLocaleDateString();
}

const deleteBook = async () => {
  try {
    await $fetch(`${config.public.API_SERVER}/api/books/${route.params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    bookStore.books.splice(indexBook, 1);
    router.replace("/");
  } catch (error) {
    console.log(error);
  }
};

const postCommentary = async () => {
  try {
    if (!bookCommentary.value) {
      return;
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
    bookStore.books[indexBook].comments.push(requestBody);
    bookCommentary.value = "";
  } catch (error) {
    console.log(error);
  }
};

const addToFavorites = async () => {
  try {
    await $fetch(`${config.public.API_SERVER}/api/books/users/${id}/favorites/${route.params.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        userId: id,
        bookId: route.params.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchBook);
</script>
