<template>
  <form
    class="max-w-md mx-auto bg-white shadow-md rounded-md p-6 z-20 relative"
    @submit.prevent="submitForm"
  >
    <button
      type="button"
      @click="isFormModalOpen = false"
      class="absolute top-1 right-1 w-10 h-10 bg-red-600 text-white"
    >
      X
    </button>
    <div class="mb-4">
      <label for="nom-livre" class="block text-gray-700 font-bold mb-2"
        >Nom du livre :</label
      >
      <input
        v-model="bookName"
        type="text"
        id="nom-livre"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div class="mb-4">
      <label for="description-livre" class="block text-gray-700 font-bold mb-2"
        >Description du livre :</label
      >
      <textarea
        v-model="bookDescription"
        id="description-livre"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="categorie-livre" class="block text-gray-700 font-bold mb-2"
        >Catégorie du livre :</label
      >
      <input
        v-model="bookCategory"
        type="text"
        id="categorie-livre"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div class="mb-4">
      <label for="note-livre" class="block text-gray-700 font-bold mb-2"
        >Note :</label
      >
      <input
        v-model="bookNote"
        type="number"
        id="note-livre"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div class="mb-4">
      <label for="fichier-livre" class="block text-gray-700 font-bold mb-2"
        >Sélectionner un fichier :</label
      >
      <input
        @change="addImage"
        type="file"
        id="fichier-livre"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Enregistrer
    </button>
  </form>
</template>

<script setup lang="ts">
import { useIsFormModalOpen } from "~/composables/state";
import { useAuthStore } from "~/store/auth";
import { useBooksStore } from "~/store/books";

const config = useRuntimeConfig()
const bookStore = useBooksStore();
const authStore = useAuthStore();
const isFormModalOpen = useIsFormModalOpen();

const props = defineProps({
  idObject: { type: String },
});

const token:string = authStore.userToken;
const username: string = authStore.username;
let bookName: string;
let bookDescription: string;
let bookCategory: string;
let bookNote: string;
let bookImage: File;

const addImage = (e: Event) => {
  bookImage = (<HTMLInputElement>e.target).files[0];
};

const submitForm = async () => {
  try {
    const formData = new FormData();

    const fields = [
      { name: "name", value: bookName },
      { name: "description", value: bookDescription },
      { name: "category", value: bookCategory },
      { name: "note", value: bookNote },
      { name: "image", value: bookImage },
      { name: "username", value: username },
    ];

    fields.forEach(({ name, value }) => {
      if (value) {
        formData.append(name, value);
      }
    });

    if (!props.idObject) {
      const response = await fetch(`${config.public.API_SERVER}/api/books`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json()
      const book = {
        _id: responseData.savedBook._id,
        name: responseData.savedBook.name,
        description: responseData.savedBook.description,
        category: responseData.savedBook.category,
        note: responseData.savedBook.note,
        image: responseData.savedBook.image,
        usrname: responseData.savedBook.username,
        comments: []
      };
      return bookStore.books.push(book);
    } else {
      await fetch(`${config.public.API_SERVER}/api/books/${props.idObject}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
