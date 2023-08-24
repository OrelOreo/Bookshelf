<template>
  <div
    class="w-full mx-auto mt-5 max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700"
  >
    <form @submit.prevent="postFormLog" class="space-y-6">
      <h5 class="text-xl font-medium text-white">{{ isFromLoginOrSignup }}</h5>
      <div v-if="!props.login">
        <label for="username" class="block mb-2 text-sm font-medium text-white"
          >Nom d'utilisateur</label
        >
        <input
          v-model="stateUser.username"
          name="username"
          id="username"
          class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-white"
          >Email</label
        >
        <input
          v-model="stateUser.email"
          type="email"
          name="email"
          id="email"
          class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Mot de passe</label
        >
        <input
          v-model="stateUser.password"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        {{ isFromLoginOrSignup }}
      </button>
      <p v-if="errMsg" class="text-red-600">{{ errMsg }}</p>
      <div v-if="props.login" class="text-sm font-medium text-gray-300">
        Pas encore inscrit ?
        <NuxtLink to="/signup" class="hover:underline text-blue-500">
          Créer un compte</NuxtLink
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { computed, reactive, ref } from "vue";
import IUserInformations from "~/types/Interfaces/UserInformations";

const config = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();

const props = defineProps({
  login: { type: Boolean },
});

const errMsg = ref('')

const stateUser: IUserInformations = reactive({
  email: "",
  password: "",
  username: "",
});


const isFromLoginOrSignup = computed(() => {
  return props.login ? "Se connecter" : "S'inscrire";
});

const postFormLog = () => (props.login ? login() : signup());

async function login() {
  try {
    const response = await $fetch(
      `${config.public.API_SERVER}/api/auth/login`,
      {
        method: "POST",
        body: {
          email: stateUser.email,
          password: stateUser.password,
        },
      }
    );
    localStorage.setItem("token", response.token);
    authStore.pushUserInformations(
      response.userId,
      response.username,
      response.token
    );
    router.replace("/");
  } catch (error) {
      errMsg.value = "Identifiant ou mot de passe incorrecte"
      setTimeout(() => {
        errMsg.value = ''
      }, 2000)
    console.log(error);
  }
}

async function signup() {
  try {
    await $fetch(`${config.public.API_SERVER}/api/auth/signup`, {
      method: "POST",
      body: {
        username: stateUser.username,
        email: stateUser.email,
        password: stateUser.password,
      },
    });
    router.replace("/login");
  } catch (error) {
    console.log(error);
  }
}
</script>
