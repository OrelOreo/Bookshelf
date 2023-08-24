<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue" 
import { useAuthStore } from "~/store/auth"

const authStore = useAuthStore()

onMounted(() => {
  authStore.initializePersistedData()
})
</script>