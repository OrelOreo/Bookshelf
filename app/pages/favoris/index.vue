<template>
    <div>
        <h1>Your favorites books</h1>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})

</script>