<template>
  <div class="w-1/5 border rounded-lg shadow bg-gray-800 border-gray-700 my-5">
    <NuxtLink :to="`books/${props.book._id}`">
      <img
        class="rounded-t-lg object-cover h-60 w-full"
        :src="`${props.book.image}`"
        alt="livre"
      />

      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ props.book.name }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ props.book.description }}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ props.book.category }}
        </p>
        <div class="flex">
          <img
            v-for="n in book.note"
            :key="n"
            src="~/assets/star.png"
            alt="rating star"
            class="h-5 w-5 mr-1"
          />
        </div>
      </div>
    </NuxtLink>
    <button
      v-if="props.favorite"
      @click="$emit('removeFromFavoriteBooks', props.favBookId)"
      class="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
    >
      X
    </button>
  </div>
</template>

<script setup lang="ts">

defineEmits(['removeFromFavoriteBooks'])
const props = defineProps({
  book: { type: Object },
  favBookId: { type: String },
  favorite: { type: Boolean },
});
</script>
