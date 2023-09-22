<template>
    <h2>Это блок с news</h2>
    <h2>{{ news.id }}</h2>
    <h2>{{ news.text }}</h2>
</template>

<script setup>
const props = defineProps({
    news: {
        type: Object,
        required: true,
        default: () => {},
    }
});
</script>