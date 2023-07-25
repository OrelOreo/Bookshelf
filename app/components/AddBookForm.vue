<template>
  <form
    class="max-w-md mx-auto bg-white shadow-md rounded-md p-6 relative"
    @submit.prevent="submitForm"
  >
    <button
      type="button"
      @click="isFormModalOpen = false"
      class="absolute top-1 right-1 w-10 h-10 bg-red-600 rounded-lg text-white"
    >
      X
    </button>
    <div class="mb-4">
      <label for="nom-livre" class="block text-gray-700 font-bold mb-2"
        >Nom du livre :</label
      >
      <input
        v-model="state.bookName"
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
        v-model="state.bookDescription"
        id="description-livre"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="categorie-livre" class="block text-gray-700 font-bold mb-2"
        >Catégorie du livre :</label
      >
      <input
        v-model="state.bookCategory"
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
        v-model="state.bookNote"
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
      class="bg-gray-800 hover:bg-gray-600 border-gray-700 text-white py-2 px-4 rounded-md"
    >
      Enregistrer
    </button>
  </form>
</template>

<script setup lang="ts">
import { useIsFormModalOpen } from "~/composables/state";
import { useAuthStore } from "~/store/auth";
import { useBooksStore } from "~/store/books";
import { reactive } from "vue"

const config = useRuntimeConfig()
const bookStore = useBooksStore();
const authStore = useAuthStore();
let isFormModalOpen = useIsFormModalOpen();

const props = defineProps({
  idObject: { type: String },
});

interface Book {
    _id: string
    name: string
    userId: string
    username: string
    image: any
    description: string
    category: string
    comments: Array<Comment>
    note: number
    createdAt: string
    updatedAt: string
}

const defaultState = () => ({
  bookName: '',
  bookDescription: '',
  bookCategory: '',
  bookNote: '',
  bookImage: null
})

const state = reactive(
  defaultState()
)

function resetFields() {
  const initial = defaultState()
  Object.keys(initial).forEach((k) => {
    state[k] = initial[k]
  })
}

const token:string = authStore.userToken;
const username: string = authStore.username;


const addImage = (e: Event) => {
  state.bookImage = (<HTMLInputElement>e.target).files[0];
};

const submitForm = async () => {
  try {
    const formData = new FormData();

    const fields = [
      { name: "name", value: state.bookName },
      { name: "description", value: state.bookDescription },
      { name: "category", value: state.bookCategory },
      { name: "note", value: state.bookNote },
      { name: "image", value: state.bookImage },
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
      const book: Book = {
        _id: responseData.savedBook._id,
        name: responseData.savedBook.name,
        userId: responseData.savedBook.userId,
        description: responseData.savedBook.description,
        category: responseData.savedBook.category,
        note: responseData.savedBook.note,
        image: responseData.savedBook.image,
        username: responseData.savedBook.username,
        comments: [],
        createdAt: responseData.savedBook.createdAt,
        updatedAt: responseData.savedBook.updatedAt
      };
      isFormModalOpen.value = false

      resetFields()
      return bookStore.postBook(book);
    } else {
      const response = await fetch(`${config.public.API_SERVER}/api/books/${props.idObject}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json()
      const indexBook = bookStore.books.findIndex(book => book._id === props.idObject)
      bookStore.updateBook(indexBook, 1, responseData)
      resetFields()
      isFormModalOpen.value = false
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
