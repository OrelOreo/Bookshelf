<template>
    <div>
        <h1 class="text-center text-5xl mt-4">Vos livres favoris</h1>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})

</script>