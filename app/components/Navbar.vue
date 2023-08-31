<template>
  <header class="h-16">
    <nav class="flex items-center bg-gray-800 p-4">
      <NuxtLink to="/" class="text-white text-xl font-serif cursor-pointer"
        >Bookshelf</NuxtLink
      >
      <div class="ml-auto mr-4">
        <NuxtLink
          v-if="!authStore.userToken"
          to="/login"
          class="font-semibold bg-gray-50 py-3 px-4 rounded-xl hover:bg-gray-100 mr-2"
          >Se connecter</NuxtLink
        >
        <NuxtLink
          v-if="!authStore.userToken"
          to="/signup"
          class="text-white font-semibold py-3 px-4 rounded-xl bg-[#8075FF] hover:bg-[#6356f1]"
          >S'inscrire</NuxtLink
        >
        <NuxtLink
          v-if="authStore.userToken"
          to="/favoris"
          class="text-white mr-4"
          >Favoris</NuxtLink
        >
        <button
          v-if="authStore.userToken"
          @click="isProfileOpen = !isProfileOpen"
          class="ml-2"
        >
          <img
            v-if="authStore.userImage"
            :src="authStore.userImage"
            alt="avatar"
            class="h-8 w-8 inline-block rounded-full"
          />
          <img
            v-else
            src="~/assets/user_icon.svg"
            alt="user"
            class="h-8 w-8 inline-block"
          />
        </button>
      </div>
    </nav>
    <div
      v-if="isProfileOpen"
      class="z-10 font-normal absolute right-0 divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600"
    >
      <NuxtLink
        to="/profile"
        class="block px-4 py-2 text-center text-gray-400 hover:bg-gray-600 hover:text-white"
        >{{ authStore.username }}</NuxtLink
      >

      <div class="py-1">
        <button
        v-if="authStore.userToken"
        @click="logout"
          class="block px-4 py-2 w-full text-sm hover:bg-gray-600 text-gray-400 hover:text-white"
        >
          Deconnexion
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { useIsProfileOpen } from "~/composables/state";
const authStore = useAuthStore();
let isProfileOpen = useIsProfileOpen();

const logout = () => {
  const dataInStorageToRemove = ["userToken", "userId", "username", "userImage"];
  isProfileOpen = !isProfileOpen

  dataInStorageToRemove.forEach((data) => {
    localStorage.removeItem(data);
    authStore[data] = "";
  });
};
</script>
