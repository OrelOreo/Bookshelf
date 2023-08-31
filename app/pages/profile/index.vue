<template>
  <div class="border border-lightgrey w-3/5 m-auto mt-4 p-4">
    <div class="flex items-center w-4/5 mx-auto">
      <img
        :src="authStore.userImage"
        class="w-28 h-28 object-cover rounded-full"
      />
      <form @submit.prevent="modifyProfile" class="flex items-center">
        <label class="block">
          <span class="sr-only">Choisis ta photo de profil</span>
          <input
            type="file"
            @change="addImage"
            class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </label>
        <div class="ml-6 flex flex-col">
          <label for="username">{{ authStore.username }}</label>
          <input
            v-model="username"
            name="username"
            id="username"
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#8075FF] focus:border-[#8075FF]"
            :placeholder="authStore.username"
          />
        </div>
        <button
          class="bg-[#8075FF] rounded-xl hover:bg-[#6356f1] py-3 px-4 text-white"
        >
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const config = useRuntimeConfig();
let avatarImage = null;
let username: "";

const addImage = (e: Event) => {
  avatarImage = (<HTMLInputElement>e.target).files[0];
};
const modifyProfile = async () => {
  try {
    const formData = new FormData();
    formData.append("userId", authStore.userId);
    formData.append("image", avatarImage);
    formData.append("username", username);
    const response = await $fetch(
      `${config.public.API_SERVER}/api/auth/profile/${authStore.userId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${authStore.userToken}`,
        },
      }
    );
    authStore.pushUserInformations(
      response.userId,
      response.username,
      response.token,
      response.image
    );

    localStorage.setItem("username", response.username);
    localStorage.setItem("userImage", response.image);
  } catch (error) {
    console.log(error);
  }
};
</script>
