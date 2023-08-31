<template>
  <div>
    <h1 class="text-center text-5xl mt-4">Vos livres favoris</h1>
    <div class="flex flex-wrap w-4/5 justify-center m-auto">
      <Card
      @remove-from-favorite-books="removeBookFromFavoriteBooks"
        v-if="bookStore.favoriteBooks.length > 0"
        v-for="favBook in bookStore.favoriteBooks"
        :favBookId="favBook._id"
        :book="favBook.book"
        :favorite="favorite"
        class="mx-4"
      />
      <span v-else class="mt-6 text-lg">Vous n'avez aucun livre dans vos favoris 😕</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "~/store/auth";
import { useBooksStore } from "~/store/books";

definePageMeta({
  middleware: ["auth"],
});

const bookStore = useBooksStore();
const config = useRuntimeConfig();
const authStore = useAuthStore();

const favorite = true

async function fetchFavoriteBooks() {
  try {
    const data = await fetch(
      `${config.public.API_SERVER}/api/books/users/${authStore.userId}/favorites`,
      {
        headers: {
          Authorization: `Bearer ${authStore.userToken}`,
        },
      }
    );
    bookStore.favoriteBooks = await data.json();
  } catch (error) {
    console.log(error);
  }
}

const removeBookFromFavoriteBooks = async (favBookId) => {
    try {
        await $fetch(`${config.public.API_SERVER}/api/books/users/${authStore.userId}/favorites/${favBookId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authStore.userToken}`
            },
        })
    } catch (error) {
        console.log(error)
    }
}

onMounted(fetchFavoriteBooks);
</script>
